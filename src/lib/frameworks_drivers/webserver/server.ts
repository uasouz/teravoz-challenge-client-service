import bodyParser = require("body-parser");
import * as express from 'express'
import {eventProcessor} from "./event_processor"
// @ts-ignore
import * as expresspino from "express-pino-logger"
import IServer from "./server_interface";
import {CallNew, CallStandBy, CallWaiting} from "../../interface_adapters/controllers/WebHookController";
import {Events} from "./events";

export default class ExpressServer implements IServer {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(expresspino());
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            next();
        });
        this.initializeHandlers();
        this.registerRoutes()
    }

    initializeHandlers() {
        eventProcessor.addEventHandlerWithKey(Events.CallNew,CallNew);
        eventProcessor.addEventHandlerWithKey(Events.CallStandby,CallStandBy);
        eventProcessor.addEventHandlerWithKey(Events.CallWaiting,CallWaiting);
    }

    registerRoutes() {
        this.express.post("/webhook", eventProcessor.processEvent.bind(eventProcessor));
    }

    listen(port: number | string) {

        const listener = this.express.listen(port);
        return listener.address()

    }
}