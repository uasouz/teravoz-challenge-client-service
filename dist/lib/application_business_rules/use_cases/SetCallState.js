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
const result_1 = require("../../enterprise_business_rules/util/result");
// Possible call states
const States = new Map(Object.entries({
    "call.new": "NEW",
    "call.standby": "STANDBY",
    "call.waiting": "WAITING",
    "call.ongoing": "ONGOING",
    "call.finished": "FINISHED"
}));
// Set a datermined state to a call based on received event
function SetCallState(callEvent, callRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        const call = yield callRepository.FindCall({ aggregate_id: callEvent.call_id });
        if (!call) {
            return result_1.Result.Fail(["This call is not registered on our database"]);
        }
        if (!call.doStateTransition(States.get(callEvent.type))) {
            return result_1.Result.Fail(["This state transition is not allowed for this Call"]);
        }
        const setCallStatusData = yield callRepository.SetCallState(callEvent.call_id, States.get(callEvent.type));
        return result_1.Result.Succeed(setCallStatusData);
    });
}
exports.SetCallState = SetCallState;
//# sourceMappingURL=SetCallState.js.map