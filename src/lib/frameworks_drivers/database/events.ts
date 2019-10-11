import * as Knex from "knex";

export async function setupEventsTable(database: Knex) {
    const hasTable = await database.schema.hasTable("events");
    if(!hasTable){
        await database.schema.createTable("events", (table) => {
            table.increments();
            table.string("aggregate_id",32).notNullable();
            table.binary("uuid",16).notNullable().unique();
            table.json("event").notNullable();
            table.boolean("valid").notNullable().defaultTo(1);
            table.timestamps(true,true)
        });
    }
}