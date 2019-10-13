import {Logger} from "../logger";
import {Request, Response} from "express";
import {BaseResponse} from "../../interface_adapters/util/response";

class EventProcessor {

    eventHandlers = new Map();

    constructor() {
    }

    private validateEntry(key: string) {
        return !this.eventHandlers.has(key)
    }

    addEventHandlerWithKey(key: string, f: (req: Request, res: Response) => void) {
        if (!this.validateEntry(f.name)) {
            Logger.info(`Key ${key} already set for function ${this.eventHandlers.get(key).name}`);
            return
        }
        this.eventHandlers.set(key, f)
    }

    addEventHandler(f: (req: Request, res: Response) => void) {
        if (!this.validateEntry(f.name)) {
            Logger.info(`Function ${f.name} already set`);
            return
        }
        this.eventHandlers.set(f.name, f)
    }

    processEvent(req: Request, res: Response) {
        const eventHandler = this.eventHandlers.get(req.body.type);
        if (eventHandler) {
            try {
                eventHandler(req, res)
            } catch (e) {
                Logger.error("Error ", e)
            }
        } else {
            BaseResponse.Fail(res,
                [ "no suitable eventHandler for this event"]
            )
        }
    }

}

export const eventProcessor = new EventProcessor();