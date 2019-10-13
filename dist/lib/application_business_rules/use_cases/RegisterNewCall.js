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
const events_1 = require("../../frameworks_drivers/webserver/events");
const result_1 = require("../../enterprise_business_rules/util/result");
//Creates a new Call object for saving to database
function CreateNewCall(call) {
    return {
        aggregate_id: call.call_id,
        state: "NEW"
    };
}
//Check if the call_id already exists on database
function CallIsDuplicate(call_id, callRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield callRepository.FindCall({ aggregate_id: call_id })) != undefined;
    });
}
//Receives a call event and check if this event is a new call,
//if it is a new call,it creates a new call on the call register with the NEW status
function RegisterNewCall(call, callRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        if (call.type === events_1.Events.CallNew && !(yield CallIsDuplicate(call.call_id, callRepository))) {
            const registerResult = yield callRepository.RegisterNewCall(CreateNewCall(call));
            return result_1.Result.Succeed(registerResult);
        }
        else {
            return result_1.Result.Fail("Failed to register call - Wrong type of event or event duplicated", //Errors can be acumutaled and passed here
            false, "Failed to register call - Wrong type of event or event duplicated");
        }
    });
}
exports.RegisterNewCall = RegisterNewCall;
//# sourceMappingURL=RegisterNewCall.js.map