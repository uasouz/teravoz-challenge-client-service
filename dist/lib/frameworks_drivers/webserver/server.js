"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const event_processor_1 = require("./event_processor");
// @ts-ignore
const expresspino = require("express-pino-logger");
const WebHookController_1 = require("../../interface_adapters/controllers/WebHookController");
const events_1 = require("./events");
//Server interface implementation using Express
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
    //Configure handlers for each event type
    initializeHandlers() {
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.CallNew, WebHookController_1.CallNew);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.CallStandby, WebHookController_1.CallStandBy);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.CallWaiting, WebHookController_1.CallWaiting);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.CallOngoing, WebHookController_1.CallOngoing);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.CallFinished, WebHookController_1.CallFinished);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.ActorEntered, WebHookController_1.ActorEntered);
        event_processor_1.eventProcessor.addEventHandlerWithKey(events_1.Events.ActorLeft, WebHookController_1.ActorLeft);
    }
    //Registers the REST routes
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