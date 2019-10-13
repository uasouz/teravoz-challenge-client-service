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
const database_1 = require("../../frameworks_drivers/database");
const Call_1 = require("../../enterprise_business_rules/models/Call");
// CallRepository Interface implementation for MySql
class CallRepositoryInMysql {
    FindCall(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default('calls');
            if (Array.isArray(params)) {
                params.forEach((value) => {
                    result = result.orWhere(value);
                });
            }
            else {
                result = result.where(params);
            }
            return Call_1.Call.serialize(yield result);
        });
    }
    RegisterNewCall(call) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('calls').insert(call, ["*"]);
            return this.FindCall({ id: result[0] });
        });
    }
    SetCallState(call_id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('calls').where({ aggregate_id: call_id }).update({ state: state }, ["*"]);
            return this.FindCall({ id: result });
        });
    }
    ListCalls(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default('calls');
            if (Array.isArray(params)) {
                params.forEach((value) => {
                    result = result.orWhere(value);
                });
            }
            else {
                result = result.where(params);
            }
            return result;
        });
    }
}
exports.callRepository = new CallRepositoryInMysql();
//# sourceMappingURL=CallRepositoryInMysql.js.map