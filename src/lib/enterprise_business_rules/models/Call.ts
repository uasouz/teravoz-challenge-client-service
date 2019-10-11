import {StateTrasition, State} from "../../util/state-trasition";

//Call Serialization Class
export class Call extends StateTrasition {

    id: number;
    aggregate_id: string; //Corresponds to the UNIQUE call_id
    state: string; // Current state of the call
    created_at: string;
    updated_at: string;

    constructor(id: number, aggregate_id: string, state: string, created_at: string, updated_at: string) {
        //Call States and allowed transitions
        const callStates = {
            "NEW": new State("NEW", ["STANDBY"]),
            "STANDBY": new State("STANDBY", ["WAITING"]),
            "WAITING": new State("WAITING", ["ONGOING"]),
            "ONGOIG": new State("ONGOING", ["FINISHED"]),
            "FINISHED": new State("FINISHED")
        };
        super(state, callStates);

        //Call Fields
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }


    private static serializeSingle(call: any) {
        return new Call(call.id, call.aggregate_id, call.state, call.created_at, call.updated_at);
    }

    static serialize(data: object) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingle)[0];
        }
        return this.serializeSingle(data)
    }

}