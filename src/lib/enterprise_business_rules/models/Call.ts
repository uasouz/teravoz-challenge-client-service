import {StateTrasition, State} from "../util/state-trasition";

//Call Class
//Call class serializes events coming from the database to be used by the service
//This class has a simple state control to avoid invalid transitions
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
            "ONGOING": new State("ONGOING", ["FINISHED"]),
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