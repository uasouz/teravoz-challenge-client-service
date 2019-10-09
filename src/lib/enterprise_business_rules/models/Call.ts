export class Call {
    type: string;
    call_id: string;
    code: string;
    direction: string;
    our_number: string;
    their_number: string;
    their_number_type: string;
    timestamp: string;
    queue: string;
    url: string;

    constructor(type: string, call_id: string, code: string,
                direction: string, our_number: string, their_number: string,
                their_number_type: string, timestamp: string, queue: string,
                url: string) {
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


    private static serializeSingle(call: any) {
        return new this(call.type, call.call_id, call.code, call.direction, call.our_number, call.their_number, call.their_number_type, call.timestamp, call.queue, call.url);
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