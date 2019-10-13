import {App, TemplatedApp} from "uWebSockets.js";
import {createMessage, Message, validateMessage} from "./message";
import {eventProcessor} from "./event_processor"
import {Logger} from "../logger";
import {ListCallEvents, ListCalls} from "../../interface_adapters/controllers/WebSocketController";

export default class uWsServer {
    public app: TemplatedApp;
    decoder = new TextDecoder("utf-8");

    constructor() {
        this.app = App();
        this.app.ws("/ws/*", {
            /* Options */
            compression: 0,//0 - disabled | 1 - Shared Compressor | 2 - Dedicated Compressor
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 1800,
            /* Handlers */
            open: (ws, req) => {
                ws.send(createMessage("Welcome","Welcome").toString())
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
}