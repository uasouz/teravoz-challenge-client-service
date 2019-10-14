import * as knex from "knex"
import * as dotenv from "dotenv";
import {setupEventsTable} from "./events";
import {setupCallsTable} from "./calls";
import {setupActorsTable} from "./actors";

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

declare module "knex/types/result" {
    interface Registry {
        Count: number;
    }
}

export const database = knex({
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

async function setupDatabase(){
    database.raw(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_SCHEMA}`);
    await setupEventsTable(database);
    await setupCallsTable(database);
    await setupActorsTable(database);
}

setupDatabase();

export default database;