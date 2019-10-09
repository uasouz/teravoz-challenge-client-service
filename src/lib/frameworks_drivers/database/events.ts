import * as Knex from "knex";

export async function setupDatabase(database: Knex) {
    const hasTableUsers = await database.schema.hasTable("events");
    if(!hasTableUsers){
        await database.schema.createTable("events", (table) => {
            table.increments();
            table.binary("aggregate_id",16).notNullable().unique();
            table.binary("uuid",16).notNullable().unique();
            table.json("event").notNullable();
            table.boolean("valid").notNullable().defaultTo(0);
            table.timestamps(true,true)
        });
    }
}