"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_trasition_1 = require("../util/state-trasition");
//Call Serialization Class
class Call extends state_trasition_1.StateTrasition {
    constructor(id, aggregate_id, state, created_at, updated_at) {
        //Call States and allowed transitions
        const callStates = {
            "NEW": new state_trasition_1.State("NEW", ["STANDBY"]),
            "STANDBY": new state_trasition_1.State("STANDBY", ["WAITING"]),
            "WAITING": new state_trasition_1.State("WAITING", ["ONGOING"]),
            "ONGOIG": new state_trasition_1.State("ONGOING", ["FINISHED"]),
            "FINISHED": new state_trasition_1.State("FINISHED")
        };
        super(state, callStates);
        //Call Fields
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    static serializeSingle(call) {
        return new Call(call.id, call.aggregate_id, call.state, call.created_at, call.updated_at);
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