import * as Knex from "knex";

export async function setupCallsTable(database: Knex) {
    const hasTable = await database.schema.hasTable("calls");
    if(!hasTable){
        await database.schema.createTable("calls", (table) => {
            table.increments();
            table.string("aggregate_id",32).notNullable();
            table.enum("status",["NEW","STANDBY","WAITING","ONGOING","FINISHED"]).defaultTo("NEW");
            table.timestamps(true,true)
        });
    }
}