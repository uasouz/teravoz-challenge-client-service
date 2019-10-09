//Transform to serializer(?)
export class Message {

    constructor(
        public data: any,
        public event: string,
        public status?: string
    ) {
    }

    toString(){
        return JSON.stringify(this)
    }

}

export function validateMessage(data: object) {
    return data.hasOwnProperty("event") && data.hasOwnProperty("data")
}

export function createMessage(data: any, event: string, status = 'Ok'): Message {
    return new Message(data, event, status)
}

