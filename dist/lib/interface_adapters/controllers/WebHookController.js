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
const EventRepositoryInMysql_1 = require("../storage/EventRepositoryInMysql");
const response_1 = require("../util/response");
const RegisterNewCall_1 = require("../../application_business_rules/use_cases/RegisterNewCall");
const CallRepositoryInMysql_1 = require("../storage/CallRepositoryInMysql");
const SetCallState_1 = require("../../application_business_rules/use_cases/SetCallState");
const SerializeAndValidateCallEvent_1 = require("../../application_business_rules/use_cases/SerializeAndValidateCallEvent");
const teravoz_1 = require("../../enterprise_business_rules/services/teravoz");
//Handles call.new event,if no Duplicate event was created
// it inserts a new Call Register on the Database with NEW state
// and Register a event to it
function CallNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateCallEvent_1.SerializeAndValidateCallEvent(req.body);
        if (!callEventResult.success) {
            return response_1.BaseResponse.Fail(res, callEventResult.errors);
        }
        const registerCallResult = yield RegisterNewCall_1.RegisterNewCall(callEventResult.data, CallRepositoryInMysql_1.callRepository);
        if (registerCallResult.success) {
            const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(callEventResult.data);
            return response_1.BaseResponse.Succeed(res, event);
        }
        return response_1.BaseResponse.Fail(res, registerCallResult.errors);
    });
}
exports.CallNew = CallNew;
//Handles call.standby event
// If the databasa already contains a Call with the informed call_id and with state equal to NEW,
// it sets it to StandBy and executes the delegation Operation,
// in the end adds a new event to this call
function CallStandBy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateCallEvent_1.SerializeAndValidateCallEvent(req.body);
        if (!callEventResult.success) {
            return response_1.BaseResponse.Fail(res, callEventResult.errors);
        }
        const delegateResult = teravoz_1.Delegate(callEventResult.data.call_id);
        if (delegateResult.status != "ok") {
            return response_1.BaseResponse.Fail(res, ["Delegate Failed"]);
        }
        const setCallStatusResult = yield SetCallState_1.SetCallState(callEventResult.data, CallRepositoryInMysql_1.callRepository);
        if (!setCallStatusResult.success) {
            return response_1.BaseResponse.Fail(res, setCallStatusResult.errors);
        }
        const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(callEventResult.data);
        return response_1.BaseResponse.Succeed(res, event);
    });
}
exports.CallStandBy = CallStandBy;
function CallWaiting(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateCallEvent_1.SerializeAndValidateCallEvent(req.body);
        if (!callEventResult.success) {
            return response_1.BaseResponse.Fail(res, callEventResult.errors);
        }
        const setCallStatusResult = yield SetCallState_1.SetCallState(callEventResult.data, CallRepositoryInMysql_1.callRepository);
        if (!setCallStatusResult.success) {
            return response_1.BaseResponse.Fail(res, setCallStatusResult.errors);
        }
        const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(callEventResult.data);
        return response_1.BaseResponse.Succeed(res, event);
    });
}
exports.CallWaiting = CallWaiting;
//# sourceMappingURL=WebHookController.js.map