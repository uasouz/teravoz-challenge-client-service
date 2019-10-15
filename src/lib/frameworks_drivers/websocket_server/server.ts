import {App, TemplatedApp, WebSocket} from "uWebSockets.js";
import {createMessage, Message, validateMessage} from "./message";
import {eventProcessor} from "./event_processor"
import {Logger} from "../logger";
import {ListCallEvents, ListCalls} from "../../interface_adapters/controllers/WebSocketController";
import {createBinaryUUID} from "../../util/binary-uuid/binary-uuid";
import * as Redis from 'ioredis'
import {Publisher} from "../webserver/publisher";

export default class uWsServer implements Publisher{
    public app: TemplatedApp;
    decoder = new TextDecoder("utf-8");
    clients = new Map<string, WebSocket>();
    pub = new Redis(6379,process.env.REDIS_ADDR);
    sub = new Redis(6379,process.env.REDIS_ADDR);

    constructor() {
        //Redis PubSub Configuration
        this.sub.subscribe("main");
        this.sub.on('message', (channel, message) => {
            switch (channel) {
                case "main":
                    this.clients.forEach((client) => {
                        console.log("sending message to",client.client_id);
                        client.send(message)
                    })
            }
        });

        //WebSocket App configuration
        this.app = App();
        this.app.ws("/*", {
            /* Options */
            compression: 0,//0 - disabled | 1 - Shared Compressor | 2 - Dedicated Compressor
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 1800,
            /* Handlers */
            open: (ws, req) => {
                ws.client_id = createBinaryUUID().uuid;
                this.clients.set(ws.client_id, ws);
                ws.send(createMessage("Welcome", "Welcome").toString())
            },
            message: (ws, data, isBinary) => {
                const message = JSON.parse(this.decoder.decode(data)) as Message;
                if (message && validateMessage(message)) {
                    eventProcessor.processEvent(ws, message.event, message)
                } else {
                    ws.send(createMessage({
                        success: false,
                        error: "invalid body"
                    }, 'InvalidMessage', "Failed").toString())
                }
            },

            drain: (ws) => {
                Logger.warn('WebSocket backpressure: ' + ws.getBufferedAmount());
            },
            close: (ws, code, message) => {
                Logger.info('WebSocket closed');
            }
        });
    }

    initializeHandlers() {
        eventProcessor.addEventHandler(ListCalls);
        eventProcessor.addEventHandler(ListCallEvents);
    }

    registerRoutes() {
        this.app.any('/*', (res, req) => {
            res.end('Nothing to see here!');
        });
    }

    listen(port: number) {
        this.app.listen(port, (token) => {
            if (token) {
                Logger.info('Listening to port ' + port);
            } else {
                Logger.info('Failed to listen to port ' + port);
            }
        })
    }

    publish(topic: string,message: any) {
        console.log("publishing",message)
        this.pub.publish(topic, JSON.stringify(message))
    }
}