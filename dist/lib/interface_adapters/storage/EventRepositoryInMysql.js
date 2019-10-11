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
const Event_1 = require("../../enterprise_business_rules/models/Event");
const CreateEvent_1 = require("../../application_business_rules/use_cases/CreateEvent");
class EventRepositoryInMysql {
    FindEvent(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default('events');
            if (Array.isArray(params)) {
                params.forEach((value) => {
                    result = result.orWhere(value);
                });
            }
            else {
                result = result.where(params);
            }
            return Event_1.Event.serialize(yield result);
        });
    }
    RegisterEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('events').insert(CreateEvent_1.CreateEvent(event), ["*"]);
            return this.FindEvent({ id: result[0] });
        });
    }
}
exports.eventRepository = new EventRepositoryInMysql();
//# sourceMappingURL=EventRepositoryInMysql.js.map