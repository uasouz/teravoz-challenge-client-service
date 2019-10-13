'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Create a server with a host and port
const server_1 = require("./lib/frameworks_drivers/webserver/server");
const dotenv = require('dotenv');
dotenv.config();
const database_1 = require("./lib/frameworks_drivers/database");
const server_2 = require("./lib/frameworks_drivers/websocket_server/server");
const logger_1 = require("./lib/frameworks_drivers/logger");
class App {
    constructor() {
        //Returns server Address
        this.address = () => {
            if (this.server) {
                return this.server.address();
            }
        };
        // Start the server
        this.start = () => {
            logger_1.Logger.info(process.env.DB_ADDR);
            try {
                database_1.default.raw('select 1+1 as result').then((result) => {
                    logger_1.Logger.info('Connection to DB has been established successfully.');
                });
            }
            catch (err) {
                logger_1.Logger.info('Unable to connect to the database:', err);
            }
            try {
                this.server = new server_1.default();
                const wsServer = new server_2.default();
                wsServer.registerRoutes();
                wsServer.initializeHandlers();
                wsServer.listen(4000);
                console.log('Server running at port:', this.server.listen(3000));
            }
            catch (err) {
                logger_1.Logger.info(err);
                process.exit(1);
            }
        };
    }
}
exports.App = App;
const app = new App();
app.start();
//# sourceMappingURL=index.js.map