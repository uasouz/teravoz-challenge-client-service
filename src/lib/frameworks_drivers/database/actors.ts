import * as Knex from "knex";

export async function setupActorsTable(database: Knex) {
    const hasTable = await database.schema.hasTable("actors");
    if(!hasTable){
        await database.schema.createTable("actors", (table) => {
            table.increments();
            table.binary("uuid",16).notNullable().unique();
            table.string("email",256).notNullable().unique();
            table.string("number",12).notNullable();
            table.timestamps(true,true)
        });
    }
}