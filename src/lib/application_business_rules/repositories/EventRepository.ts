import {Event} from "../../enterprise_business_rules/models/Event";

export interface IEventRepository {
    RegisterEvent(event: any): Promise<Event>

    FindEvent(params: any): Promise<Event>
}