"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const message_1 = require("./message");
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
    processEvent(ws, event, message) {
        const eventHandler = this.eventHandlers.get(event);
        if (eventHandler) {
            try {
                eventHandler(ws, message);
            }
            catch (e) {
                logger_1.Logger.error("Error ", e);
            }
        }
        else {
            ws.send(message_1.createMessage({
                success: false,
                error: "no suitable eventHandler for this event"
            }, 'InvalidEvent', "Failed").toString());
        }
    }
}
exports.eventProcessor = new EventProcessor();
//# sourceMappingURL=event_processor.js.map