
export class Call {
    id: number;
    aggregate_id: string;
    status: string;
    created_at: string;
    updated_at: string;

    constructor(id: number,aggregate_id: string,status: string,created_at: string,updated_at: string) {
        this.id = id;
        this.aggregate_id = aggregate_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }


    private static serializeSingle(call: any) {
        return new Call(call.id, call.aggregate_id, call.status, call.created_at, call.updated_at);
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