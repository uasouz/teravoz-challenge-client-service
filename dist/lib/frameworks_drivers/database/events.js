"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function setupDatabase(database) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasTable = yield database.schema.hasTable("events");
        if (!hasTable) {
            yield database.schema.createTable("events", (table) => {
                table.increments();
                table.string("aggregate_id", 32).notNullable();
                table.binary("uuid", 16).notNullable().unique();
                table.json("event").notNullable();
                table.boolean("valid").notNullable().defaultTo(1);
                table.timestamps(true, true);
            });
        }
    });
}
exports.setupDatabase = setupDatabase;
//# sourceMappingURL=events.js.map