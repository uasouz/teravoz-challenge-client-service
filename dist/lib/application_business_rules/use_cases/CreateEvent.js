"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_uuid_1 = require("../../util/binary-uuid/binary-uuid");
function CreateEvent(event) {
    return {
        uuid: binary_uuid_1.createBinaryUUID().buffer,
        aggregate_id: event.call_id,
        event: JSON.stringify(event),
        valid: true
    };
}
exports.CreateEvent = CreateEvent;
//# sourceMappingURL=CreateEvent.js.map