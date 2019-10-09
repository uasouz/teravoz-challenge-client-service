'use strict';

// Create a server with a host and port
import ExpressServer from "./lib/frameworks_drivers/webserver/server";

const dotenv = require('dotenv');
dotenv.config();

import database from "./lib/frameworks_drivers/database";
import {Logger} from "./lib/frameworks_drivers/logger";

// Start the server
const start = async () => {
    Logger.info(process.env.DB_ADDR!!);
    try {
        await database.raw('select 1+1 as result');
        Logger.info('Connection to DB has been established successfully.');
    } catch (err) {
        Logger.info('Unable to connect to the database:', err);
    }

    try {
        const server = new ExpressServer();
        console.log('Server running at port:', server.listen(3000));
    } catch (err) {
        Logger.info(err);
        process.exit(1);
    }
};

start();