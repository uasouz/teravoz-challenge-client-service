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
function setupCallsTable(database) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasTable = yield database.schema.hasTable("calls");
        if (!hasTable) {
            yield database.schema.createTable("calls", (table) => {
                table.increments();
                table.string("aggregate_id", 32).notNullable();
                table.enum("state", ["NEW", "STANDBY", "WAITING", "ONGOING", "FINISHED"]).defaultTo("NEW");
                table.timestamps(true, true);
            });
        }
    });
}
exports.setupCallsTable = setupCallsTable;
//# sourceMappingURL=calls.js.map