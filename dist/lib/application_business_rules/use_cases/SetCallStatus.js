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
var States;
(function (States) {
    States["call.new"] = "NEW";
    States["call.standby"] = "STANDBY";
    States["call.waiting"] = "WAITING";
    States["call.ongoing"] = "ONGOING";
    States["call.finished"] = "FINISHED";
})(States || (States = {}));
function SetCallStatus(callEvent, callRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        const call = yield callRepository.FindCall({ aggregate_id: callEvent.call_id });
        if (!call) {
            return result_1.Result.Fail(["This call is not registered on our database"]);
        }
        // @ts-ignore
        if (!call.doStateTransition(States[callEvent.type])) {
            return result_1.Result.Fail(["This state transition is not allowed for this Call"]);
        }
        // @ts-ignore
        const setCallStatusData = yield callRepository.SetCallStatus(callEvent.call_id, States[callEvent.type]);
        return result_1.Result.Succeed(setCallStatusData);
    });
}
exports.SetCallStatus = SetCallStatus;
//# sourceMappingURL=SetCallStatus.js.map