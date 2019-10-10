"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Call {
    constructor(type, call_id, code, direction, our_number, their_number, their_number_type, timestamp, queue, url) {
        this.type = type;
        this.call_id = call_id;
        this.code = code;
        this.direction = direction;
        this.our_number = our_number;
        this.their_number = their_number;
        this.their_number_type = their_number_type;
        this.timestamp = timestamp;
        this.queue = queue;
        this.url = url;
    }
    static serializeSingle(call) {
        return new this(call.type, call.call_id, call.code, call.direction, call.our_number, call.their_number, call.their_number_type, call.timestamp, call.queue, call.url);
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
exports.Call = Call;
//# sourceMappingURL=Call.js.map