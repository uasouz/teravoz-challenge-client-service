"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_uuid_1 = require("../../../util/binary-uuid/binary-uuid");
class Event {
    constructor(id, aggregate_id, uuid, event) {
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.uuid = binary_uuid_1.fromBinaryUUID(uuid);
        this.event = event;
    }
    static serializeSingle(event) {
        console.log(this);
        return new this(event.id, event.aggregate_id, event.uuid, event.event);
    }
    static serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingle)[0];
        }
        return this.serializeSingle(data);
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map