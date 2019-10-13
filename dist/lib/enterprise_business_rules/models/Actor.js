"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_uuid_1 = require("../../util/binary-uuid/binary-uuid");
//Actor class serializes events coming from the database to be used by the service
class Actor {
    constructor(id, uuid, actor, number) {
        this.id = id;
        this.uuid = binary_uuid_1.fromBinaryUUID(uuid);
        this.actor = actor;
        this.number = number;
    }
    static serializeSingle(actor) {
        return new Actor(actor.id, actor.uuid, actor.actor, actor.number);
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
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map