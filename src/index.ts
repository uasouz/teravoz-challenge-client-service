'use strict';

// Create a server with a host and port
import ExpressServer from "./lib/frameworks_drivers/webserver/server";

const dotenv = require('dotenv');
dotenv.config();

import database from "./lib/frameworks_drivers/database";
import UWSServer from "./lib/frameworks_drivers/websocket_server/server";
import {Logger} from "./lib/frameworks_drivers/logger";

class App {
    server?: ExpressServer;

    constructor(){
        this.start();
    }

    //Returns server Address
    address = () => {
        if (this.server) {
            return this.server.address()
        }
    };

    // Start the server
    start = () => {
        Logger.info(process.env.DB_ADDR!!);
        try {
            database.raw('select 1+1 as result').then((result)=>{
                Logger.info('Connection to DB has been established successfully.');
            });
        } catch (err) {
            Logger.info('Unable to connect to the database:', err);
        }

        try {
            this.server = new ExpressServer();
            const wsServer = new UWSServer();
            this.server.setPusblisher(wsServer);
            wsServer.registerRoutes();
            wsServer.initializeHandlers();
            wsServer.listen(4000);
            console.log('Server running at port:', this.server.listen(3000));
        } catch (err) {
            Logger.info(err);
            process.exit(1);
        }
    };
}

export const app = new App();