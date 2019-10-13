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
function setupActorsTable(database) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasTable = yield database.schema.hasTable("actors");
        if (!hasTable) {
            yield database.schema.createTable("actors", (table) => {
                table.increments();
                table.binary("uuid", 16).notNullable().unique();
                table.string("email", 256).notNullable().unique();
                table.string("number", 12).notNullable();
                table.timestamps(true, true);
            });
        }
    });
}
exports.setupActorsTable = setupActorsTable;
//# sourceMappingURL=actors.js.map