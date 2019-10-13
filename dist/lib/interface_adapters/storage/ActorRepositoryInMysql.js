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
const Actor_1 = require("../../enterprise_business_rules/models/Actor");
const database_1 = require("../../frameworks_drivers/database");
// ActorRepository Interface implementation for MySql
class ActorRepositoryInMysql {
    FindActor(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default('actors');
            if (Array.isArray(params)) {
                params.forEach((value) => {
                    result = result.orWhere(value);
                });
            }
            else {
                result = result.where(params);
            }
            return Actor_1.Actor.serialize(yield result);
        });
    }
    RegisterNewActor(actor) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('actors').insert(actor, ["*"]);
            return this.FindActor({ id: result[0] });
        });
    }
}
exports.actorRepository = new ActorRepositoryInMysql();
//# sourceMappingURL=ActorRepositoryInMysql.js.map