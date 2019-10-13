"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uWebSockets_js_1 = require("uWebSockets.js");
const message_1 = require("./message");
const event_processor_1 = require("./event_processor");
const logger_1 = require("../logger");
const WebSocketController_1 = require("../../interface_adapters/controllers/WebSocketController");
class uWsServer {
    constructor() {
        this.decoder = new TextDecoder("utf-8");
        this.app = uWebSockets_js_1.App();
        this.app.ws("/ws/*", {
            /* Options */
            compression: 0,
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 1800,
            /* Handlers */
            open: (ws, req) => {
                ws.send(message_1.createMessage("Welcome", "Welcome").toString());
            },
            message: (ws, data, isBinary) => {
                const message = JSON.parse(this.decoder.decode(data));
                if (message && message_1.validateMessage(message)) {
                    event_processor_1.eventProcessor.processEvent(ws, message.event, message);
                }
                else {
                    ws.send(message_1.createMessage({
                        success: false,
                        error: "invalid body"
                    }, 'InvalidMessage', "Failed").toString());
                }
            },
            drain: (ws) => {
                logger_1.Logger.warn('WebSocket backpressure: ' + ws.getBufferedAmount());
            },
            close: (ws, code, message) => {
                logger_1.Logger.info('WebSocket closed');
            }
        });
    }
    initializeHandlers() {
        event_processor_1.eventProcessor.addEventHandler(WebSocketController_1.ListCalls);
        event_processor_1.eventProcessor.addEventHandler(WebSocketController_1.ListCallEvents);
    }
    registerRoutes() {
        this.app.any('/*', (res, req) => {
            res.end('Nothing to see here!');
        });
    }
    listen(port) {
        this.app.listen(port, (token) => {
            if (token) {
                logger_1.Logger.info('Listening to port ' + port);
            }
            else {
                logger_1.Logger.info('Failed to listen to port ' + port);
            }
        });
    }
}
exports.default = uWsServer;
//# sourceMappingURL=server.js.map