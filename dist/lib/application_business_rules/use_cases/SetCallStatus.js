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
var Status;
(function (Status) {
    Status["call.new"] = "NEW";
    Status["call.standby"] = "STANDBY";
    Status["call.waiting"] = "WAITING";
    Status["call.ongoing"] = "ONGOING";
    Status["call.finished"] = "FINISHED";
})(Status || (Status = {}));
function SetCallStatus(callEvent, callRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        return yield callRepository.SetCallStatus(callEvent.call_id, Status[callEvent.type]);
    });
}
exports.SetCallStatus = SetCallStatus;
//# sourceMappingURL=SetCallStatus.js.map