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
const SerializeAndValidateEvent_1 = require("../../application_business_rules/use_cases/SerializeAndValidateEvent");
const teravoz_1 = require("../../enterprise_business_rules/services/teravoz");
const ActorRepositoryInMysql_1 = require("../storage/ActorRepositoryInMysql");
const RegisterNewActor_1 = require("../../application_business_rules/use_cases/RegisterNewActor");
//Call Events Handlers
//Handles call.new event,if no Duplicate event was created
// it inserts a new Call Register on the Database with NEW state
// and Register a event to it
function CallNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateEvent_1.SerializeAndValidateCallEvent(req.body);
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
        const callEventResult = SerializeAndValidateEvent_1.SerializeAndValidateCallEvent(req.body);
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
// Handle the call.waiting event
// Set the call state to WAITING and records a event to it
function CallWaiting(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateEvent_1.SerializeAndValidateCallEvent(req.body);
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
// Handle the call.Ongoing event
// Set the call state to ONGOING and records a event to it
function CallOngoing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateEvent_1.SerializeAndValidateCallEvent(req.body);
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
exports.CallOngoing = CallOngoing;
// Handle the call.finished event
// Set the call state to FINISHED and records a event to it
function CallFinished(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const callEventResult = SerializeAndValidateEvent_1.SerializeAndValidateCallEvent(req.body);
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
exports.CallFinished = CallFinished;
//Actor Events Handlers
// Handle the actor.entered event
// Check if it is a valid Actor event and if it is,
// saves a event related to the call he joined
// If the actor does no exists in database,it creates a new Actor
function ActorEntered(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actorEventResult = SerializeAndValidateEvent_1.SerializeAndValidateActorEvent(req.body);
        if (!actorEventResult.success) {
            return response_1.BaseResponse.Fail(res, actorEventResult.errors);
        }
        const registerActorResult = yield RegisterNewActor_1.RegisterNewActor(actorEventResult.data, ActorRepositoryInMysql_1.actorRepository);
        if (registerActorResult.success) {
            const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(actorEventResult.data);
            return response_1.BaseResponse.Succeed(res, event);
        }
        return response_1.BaseResponse.Fail(res, registerActorResult.errors);
    });
}
exports.ActorEntered = ActorEntered;
// Handle the actor.left event
// Check if it is a valid Actor event and if it is,
// saves a event related to the call he joined
function ActorLeft(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const actorEventResult = SerializeAndValidateEvent_1.SerializeAndValidateActorEvent(req.body);
        if (!actorEventResult.success) {
            return response_1.BaseResponse.Fail(res, actorEventResult.errors);
        }
        const event = yield EventRepositoryInMysql_1.eventRepository.RegisterEvent(actorEventResult.data);
        return response_1.BaseResponse.Succeed(res, event);
    });
}
exports.ActorLeft = ActorLeft;
//# sourceMappingURL=WebHookController.js.map