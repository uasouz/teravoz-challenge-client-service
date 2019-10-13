import database from "../../frameworks_drivers/database";
import {IEventRepository} from "../../application_business_rules/repositories/EventRepository";
import {Event} from "../../enterprise_business_rules/models/Event";
import {CreateEvent} from "../../application_business_rules/use_cases/CreateEvent";

// EventRepository Interface implementation for MySql
class EventRepositoryInMysql implements IEventRepository {
    async FindEvent(params: any): Promise<Event> {
        let result = database('events');
        if (Array.isArray(params)) {
            params.forEach((value) => {
                result = result.orWhere(value)
            })
        } else {
            result = result.where(params)
        }
        return Event.serialize(await result)
    }

    async RegisterEvent(event: any): Promise<Event> {
        const result = await database('events').insert(CreateEvent(event), ["*"]);
        return this.FindEvent({id: result[0]})
    }
}

export const eventRepository = new EventRepositoryInMysql();