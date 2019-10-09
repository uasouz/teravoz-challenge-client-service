import {Call} from "../../enterprise_business_rules/models/Call";

export interface ICallRepository {
    RegisterCallEvent(): Promise<boolean>
    FindCall(params: any): Promise<Call>
}