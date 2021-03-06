import {createBinaryUUID} from "../../util/binary-uuid/binary-uuid";

//Serializes a event to be recorded on the database
export function CreateEvent(event: any) {
    return {
        uuid: createBinaryUUID().buffer,
        aggregate_id: event.call_id,
        event: JSON.stringify(event),
        valid: true
    }
}