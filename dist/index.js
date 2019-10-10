'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create a server with a host and port
const server_1 = require("./lib/frameworks_drivers/webserver/server");
const dotenv = require('dotenv');
dotenv.config();
const database_1 = require("./lib/frameworks_drivers/database");
const logger_1 = require("./lib/frameworks_drivers/logger");
// Start the server
const start = () => __awaiter(this, void 0, void 0, function* () {
    logger_1.Logger.info(process.env.DB_ADDR);
    try {
        yield database_1.default.raw('select 1+1 as result');
        logger_1.Logger.info('Connection to DB has been established successfully.');
    }
    catch (err) {
        logger_1.Logger.info('Unable to connect to the database:', err);
    }
    try {
        const server = new server_1.default();
        console.log('Server running at port:', server.listen(3000));
    }
    catch (err) {
        logger_1.Logger.info(err);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=index.js.map