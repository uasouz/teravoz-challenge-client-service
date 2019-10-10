"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const response_1 = require("../../interface_adapters/util/response");
const events_1 = require("./events");
class EventProcessor {
    constructor() {
        this.eventHandlers = new Map();
    }
    validateEntry(key) {
        return !this.eventHandlers.has(key);
    }
    addEventHandlerWithKey(key, f) {
        if (!this.validateEntry(f.name)) {
            logger_1.Logger.info(`Key ${key} already set for function ${this.eventHandlers.get(key).name}`);
            return;
        }
        this.eventHandlers.set(key, f);
    }
    addEventHandler(f) {
        if (!this.validateEntry(f.name)) {
            logger_1.Logger.info(`Function ${f.name} already set`);
            return;
        }
        this.eventHandlers.set(f.name, f);
    }
    processEvent(req, res) {
        const eventHandler = this.eventHandlers.get(events_1.Events[req.body.type]);
        if (eventHandler) {
            try {
                eventHandler(req, res);
            }
            catch (e) {
                logger_1.Logger.error("Error ", e);
            }
        }
        else {
            response_1.BaseResponse.Fail(res, {
                success: false,
                error: "no suitable eventHandler for this event"
            });
            // createMessage({
            //     success: false,
            //     error: "no suitable eventHandler for this event"
            // }, 'InvalidEvent',"Failed")
        }
    }
}
exports.eventProcessor = new EventProcessor();
//# sourceMappingURL=event_processor.js.map