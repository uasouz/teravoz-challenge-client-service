import {WebSocket} from "uWebSockets.js";
import {Logger} from "../logger";
import {createMessage, Message} from "./message";

class EventProcessor {

    eventHandlers = new Map();

    constructor() {
    }

    private validateEntry(key: string) {
        return !this.eventHandlers.has(key)
    }

    addEventHandlerWithKey(key: string, f: (ws: WebSocket, message: Message) => void) {
        if (!this.validateEntry(f.name)) {
            Logger.info(`Key ${key} already set for function ${this.eventHandlers.get(key).name}`);
            return
        }
        this.eventHandlers.set(key, f)
    }

    addEventHandler(f: (ws: WebSocket, message: Message) => void) {
        if (!this.validateEntry(f.name)) {
            Logger.info(`Function ${f.name} already set`);
            return
        }
        this.eventHandlers.set(f.name, f)
    }

    processEvent(ws: WebSocket, event: string, message: Message) {
        const eventHandler = this.eventHandlers.get(event);
        if (eventHandler) {
            try {
                eventHandler(ws, message)
            } catch (e) {
                Logger.error("Error ", e)
            }
        } else {
            ws.send(createMessage({
                success: false,
                error: "no suitable eventHandler for this event"
            }, 'InvalidEvent',"Failed").toString())
        }
    }

}
export const eventProcessor = new EventProcessor();