import {fromBinaryUUID} from "../../util/binary-uuid/binary-uuid";

//Actor class serializes events coming from the database to be used by the service
export class Actor {
    id: number;
    actor: string;
    uuid: string;
    number: string;

    constructor(id: number, uuid: Buffer, actor: string, number: string) {
        this.id = id;
        this.uuid = fromBinaryUUID(uuid);
        this.actor = actor;
        this.number = number;
    }

    private static serializeSingle(actor: any) {
        return new Actor(actor.id, actor.uuid, actor.actor, actor.number);
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