import bodyParser = require("body-parser");
import * as express from 'express'
import {eventProcessor} from "./event_processor"
// @ts-ignore
import * as expresspino from "express-pino-logger"
import IServer from "./server_interface";
import {CallNew} from "../../interface_adapters/controllers/WebHookController";

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
        eventProcessor.addEventHandler(CallNew)
    }

    registerRoutes() {
        this.express.post("/webhook", eventProcessor.processEvent.bind(eventProcessor));
    }

    listen(port: number | string) {

        const listener = this.express.listen(port);
        return listener.address()

    }
}