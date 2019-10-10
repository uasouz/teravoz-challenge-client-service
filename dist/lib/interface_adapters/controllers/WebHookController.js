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
const Call_1 = require("../../enterprise_business_rules/models/Call");
const ValidateEvent_1 = require("../../application_business_rules/use_cases/ValidateEvent");
const CallRepositoryInMysql_1 = require("../storage/CallRepositoryInMysql");
const response_1 = require("../util/response");
function CallNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const call = Call_1.Call.serialize(req.body);
        const isValidCall = ValidateEvent_1.ValidateCall(call);
        if (!isValidCall) {
            return response_1.BaseResponse.Fail(res, {});
        }
        const event = yield CallRepositoryInMysql_1.callRepository.RegisterCallEvent(call);
        return response_1.BaseResponse.Succeed(res, event);
    });
}
exports.CallNew = CallNew;
//# sourceMappingURL=WebHookController.js.map