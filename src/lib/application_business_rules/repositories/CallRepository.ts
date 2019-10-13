import {Call} from "../../enterprise_business_rules/models/Call";

//CallRepository interface
export interface ICallRepository {

    ListCalls(params: any): Promise<Call[]>

    FindCall(params: any): Promise<Call>

    RegisterNewCall(call: any): Promise<Call>

    SetCallState(call_id: string, status: string): Promise<Call>
}