import {Call} from "../../enterprise_business_rules/models/Call";
import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";

export interface ICallRepository {
    FindCall(params: any): Promise<Call>

    RegisterNewCall(call: any): Promise<Call>

    SetCallStatus(call_id: string, status: string): Promise<Call>
}