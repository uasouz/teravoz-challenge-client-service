// ActorEvent class serializes a received event as a ActorEvent to be used by the service

export class ActorEvent {
    type: string;
    call_id: string;
    code: string;
    actor: string;
    number: string;
    timestamp: string;
    queue: string;

    constructor(type: string, call_id: string, code: string,
                actor: string, number: string, timestamp: string,
                queue: string) {
        this.type = type;
        this.call_id = call_id;
        this.code = code;
        this.actor = actor;
        this.number = number;
        this.timestamp = timestamp;
        this.queue = queue;
    }

    private static serializeSingle(event: any) {
        return new this(event.type,event.call_id,event.code, event.actor,event.number,event.timestamp, event.queue);
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