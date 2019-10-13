import {Event} from "../../enterprise_business_rules/models/Event";

//EventRepository interface
export interface IEventRepository {
    //RegisterEvent records the informed a event to databasa
    RegisterEvent(event: any): Promise<Event>

    //FindEvent search for one or more events on database based on the informed params
    FindEvent(params: any): Promise<Event>
}