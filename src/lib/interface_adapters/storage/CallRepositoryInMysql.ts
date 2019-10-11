import {ICallRepository} from "../../application_business_rules/repositories/CallRepository";
import database from "../../frameworks_drivers/database";
import {Call} from "../../enterprise_business_rules/models/Call";
import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";

class CallRepositoryInMysql implements ICallRepository {
    async FindCall(params: any): Promise<Call> {
        let result = database('calls');
        if (Array.isArray(params)) {
            params.forEach((value) => {
                result = result.orWhere(value)
            })
        } else {
            result = result.where(params)
        }
        return Call.serialize(await result)
    }

    async RegisterNewCall(call: any): Promise<any> {
        const result = await database('calls').insert(call, ["*"]);
        return this.FindCall({id: result[0]})
    }

    async SetCallStatus(call_id: string, status: string): Promise<Call> {
        const result = await database('calls').where({aggregate_id: call_id}).update({status: status}, ["*"]);
        return this.FindCall({id: result})
    }

}

export const callRepository = new CallRepositoryInMysql();