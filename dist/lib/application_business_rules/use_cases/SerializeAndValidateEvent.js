"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CallEvent_1 = require("../../enterprise_business_rules/models/CallEvent");
const ValidateEvent_1 = require("./ValidateEvent");
const result_1 = require("../../enterprise_business_rules/util/result");
const ActorEvent_1 = require("../../enterprise_business_rules/models/ActorEvent");
function SerializeAndValidateCallEvent(data) {
    const callEvent = CallEvent_1.CallEvent.serialize(data);
    const isValidCallEvent = ValidateEvent_1.ValidateCallEvent(callEvent);
    if (!isValidCallEvent) {
        return result_1.Result.Fail(["Invalid Call Event"]);
    }
    return result_1.Result.Succeed(callEvent);
}
exports.SerializeAndValidateCallEvent = SerializeAndValidateCallEvent;
function SerializeAndValidateActorEvent(data) {
    const actorEvent = ActorEvent_1.ActorEvent.serialize(data);
    const isValidCallEvent = ValidateEvent_1.ValidateActorEvent(actorEvent);
    if (!isValidCallEvent) {
        return result_1.Result.Fail(["Invalid Actor Event"]);
    }
    return result_1.Result.Succeed(actorEvent);
}
exports.SerializeAndValidateActorEvent = SerializeAndValidateActorEvent;
//# sourceMappingURL=SerializeAndValidateEvent.js.map