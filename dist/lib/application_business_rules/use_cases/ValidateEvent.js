"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../frameworks_drivers/webserver/events");
function IsValidEvent(event) {
    return Object.keys(events_1.Events).includes(event.type);
}
function getEventCategory(event) {
    return event.type.split(".")[0];
}
function isCallEvent(eventType) {
    return eventType === "call";
}
function ValidateCall(event) {
    const eventTypeExists = IsValidEvent(event);
    if (eventTypeExists) {
        if (isCallEvent(getEventCategory(event))) {
            return true;
        }
        return false;
    }
    return false;
}
exports.ValidateCall = ValidateCall;
//# sourceMappingURL=ValidateEvent.js.map