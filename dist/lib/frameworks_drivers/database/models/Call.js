"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Call {
    constructor(id, aggregate_id, status, created_at, updated_at) {
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.state = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    static serializeSingle(call) {
        return new Call(call.id, call.aggregate_id, call.status, call.created_at, call.updated_at);
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