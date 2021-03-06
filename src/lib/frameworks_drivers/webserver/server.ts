import bodyParser = require("body-parser");
import * as express from 'express'
import {eventProcessor} from "./event_processor"
// @ts-ignore
import * as expresspino from "express-pino-logger"
import IServer from "./server_interface";
import {
    ActorEntered, ActorLeft,
    CallFinished,
    CallNew,
    CallOngoing,
    CallStandBy,
    CallWaiting
} from "../../interface_adapters/controllers/WebHookController";
import {Events} from "./events";
import {Server} from "http";
import {Publisher} from "./publisher";

//Server interface implementation using Express
export default class ExpressServer implements IServer {
    public express: express.Application;
    listener?: Server;
    publisher?: Publisher;
    address(){
        if(this.listener) {
            return this.listener.address()
        }
    }

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

    //Configure handlers for each event type
    initializeHandlers() {
        eventProcessor.addEventHandlerWithKey(Events.CallNew,CallNew);
        eventProcessor.addEventHandlerWithKey(Events.CallStandby,CallStandBy);
        eventProcessor.addEventHandlerWithKey(Events.CallWaiting,CallWaiting);
        eventProcessor.addEventHandlerWithKey(Events.CallOngoing,CallOngoing);
        eventProcessor.addEventHandlerWithKey(Events.CallFinished,CallFinished);
        eventProcessor.addEventHandlerWithKey(Events.ActorEntered,ActorEntered);
        eventProcessor.addEventHandlerWithKey(Events.ActorLeft,ActorLeft);
    }

    //Registers the REST routes
    registerRoutes() {
        this.express.post("/webhook", (req,res)=> eventProcessor.processEvent.bind(eventProcessor)(req,res,this.publisher));
    }

    listen(port: number | string) {

        this.listener = this.express.listen(port);
        return this.listener.address()

    }

    setPusblisher(publisher: Publisher) {
        this.publisher = publisher
    }
}