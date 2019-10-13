"use strict";
// ActorEvent class serializes a received event as a ActorEvent to be used by the service
Object.defineProperty(exports, "__esModule", { value: true });
class ActorEvent {
    constructor(type, call_id, code, actor, number, timestamp, queue) {
        this.type = type;
        this.call_id = call_id;
        this.code = code;
        this.actor = actor;
        this.number = number;
        this.timestamp = timestamp;
        this.queue = queue;
    }
    static serializeSingle(event) {
        return new this(event.type, event.call_id, event.code, event.actor, event.number, event.timestamp, event.queue);
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
exports.ActorEvent = ActorEvent;
//# sourceMappingURL=ActorEvent.js.map