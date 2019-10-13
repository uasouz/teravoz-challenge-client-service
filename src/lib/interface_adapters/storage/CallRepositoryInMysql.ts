import {ICallRepository} from "../../application_business_rules/repositories/CallRepository";
import database from "../../frameworks_drivers/database";
import {Call} from "../../enterprise_business_rules/models/Call";

// CallRepository Interface implementation for MySql
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

    async SetCallState(call_id: string, state: string): Promise<Call> {
        const result = await database('calls').where({aggregate_id: call_id}).update({state: state}, ["*"]);
        return this.FindCall({id: result})
    }

}

export const callRepository = new CallRepositoryInMysql();