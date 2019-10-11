"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../frameworks_drivers/webserver/events");
function IsValidEvent(event) {
    return Object.values(events_1.Events).includes(event.type);
}
function getEventCategory(event) {
    return event.type.split(".")[0];
}
function isCallEvent(eventType) {
    return eventType === "call";
}
//Validates CallEvent by checking if it is a valid event and if is a `call.` event
function ValidateCallEvent(event) {
    const eventTypeExists = IsValidEvent(event);
    if (eventTypeExists) {
        if (isCallEvent(getEventCategory(event))) {
            return true;
        }
        return false;
    }
    return false;
}
exports.ValidateCallEvent = ValidateCallEvent;
//# sourceMappingURL=ValidateEvent.js.map