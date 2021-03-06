import {CallEvent} from "./CallEvent";
import {fromBinaryUUID} from "../../util/binary-uuid/binary-uuid";
//Event class serializes event coming/going from/to the database
export class Event {
    id: number;
    aggregate_id: string;
    uuid: string;
    event: CallEvent;

    constructor(id: number,aggregate_id: string, uuid: Buffer, event: CallEvent) {
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.uuid = fromBinaryUUID(uuid);
        this.event = event;
    }


    private static serializeSingle(event: any) {
        return new Event(event.id, event.aggregate_id, event.uuid, event.event);
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