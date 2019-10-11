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
const CallEvent_1 = require("../../enterprise_business_rules/models/CallEvent");
const ValidateEvent_1 = require("../../application_business_rules/use_cases/ValidateEvent");
const EventRepositoryInMysql_1 = require("../storage/EventRepositoryInMysql");
const response_1 = require("../util/response");
const RegisterNewCall_1 = require("../../application_business_rules/use_cases/RegisterNewCall");
const CallRepositoryInMysql_1 = require("../storage/CallRepositoryInMysql");
const SetCallStatus_1 = require("../../application_business_rules/use_cases/SetCallStatus");
function CallNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEvent = CallEvent_1.CallEvent.serialize(req.body);
        const isValidCall = ValidateEvent_1.ValidateCall(callEvent);
        if (!isValidCall) {
            return response_1.BaseResponse.Fail(res, {});
        }
        const registerCallResult = yield RegisterNewCall_1.RegisterNewCall(callEvent, CallRepositoryInMysql_1.callRepository);
        if (registerCallResult.success) {
            const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(callEvent);
            return response_1.BaseResponse.Succeed(res, event);
        }
        return response_1.BaseResponse.Fail(res, registerCallResult.errors);
    });
}
exports.CallNew = CallNew;
function CallStandBy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEvent = CallEvent_1.CallEvent.serialize(req.body);
        const isValidCall = ValidateEvent_1.ValidateCall(callEvent);
        if (!isValidCall) {
            return response_1.BaseResponse.Fail(res, {});
        }
        const setCallStatusResult = yield SetCallStatus_1.SetCallStatus(callEvent, CallRepositoryInMysql_1.callRepository);
        if (setCallStatusResult) {
            const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(callEvent);
            return response_1.BaseResponse.Succeed(res, event);
        }
        else {
            return response_1.BaseResponse.Fail(res, ["Failed to register Call Status change"]);
        }
    });
}
exports.CallStandBy = CallStandBy;
//# sourceMappingURL=WebHookController.js.map