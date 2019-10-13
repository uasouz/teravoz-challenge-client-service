"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const dotenv = require("dotenv");
const events_1 = require("./events");
const calls_1 = require("./calls");
const actors_1 = require("./actors");
dotenv.config();
const env = process.env.NODE_ENV || "development";
const config = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_SCHEMA,
    "host": process.env.DB_ADDR,
    "dialect": "mysql",
    "benchmark": true,
    "pool": {
        "max": 100,
        "min": 1,
        "idle": 10000
    }
};
exports.database = knex({
    client: "mysql2",
    // log: Logger,
    debug: true,
    pool: {
        max: 100,
        min: 1,
        idleTimeoutMillis: 10000
    },
    connection: {
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    }
});
events_1.setupEventsTable(exports.database);
calls_1.setupCallsTable(exports.database);
actors_1.setupActorsTable(exports.database);
exports.default = exports.database;
//# sourceMappingURL=index.js.map