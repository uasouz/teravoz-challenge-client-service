"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const event_processor_1 = require("./event_processor");
// @ts-ignore
const expresspino = require("express-pino-logger");
const WebHookController_1 = require("../../interface_adapters/controllers/WebHookController");
class ExpressServer {
    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(expresspino());
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            next();
        });
        this.initializeHandlers();
        this.registerRoutes();
    }
    initializeHandlers() {
        event_processor_1.eventProcessor.addEventHandler(WebHookController_1.CallNew);
    }
    registerRoutes() {
        this.express.post("/webhook", event_processor_1.eventProcessor.processEvent.bind(event_processor_1.eventProcessor));
    }
    listen(port) {
        const listener = this.express.listen(port);
        return listener.address();
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=server.js.map