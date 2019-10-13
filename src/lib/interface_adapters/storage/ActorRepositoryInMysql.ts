import {IActorRepository} from "../../application_business_rules/repositories/ActorRepository";
import {Actor} from "../../enterprise_business_rules/models/Actor";
import database from "../../frameworks_drivers/database";

// ActorRepository Interface implementation for MySql
class ActorRepositoryInMysql implements IActorRepository {

    async FindActor(params: any): Promise<Actor> {
        let result = database('actors');
        if (Array.isArray(params)) {
            params.forEach((value) => {
                result = result.orWhere(value)
            })
        } else {
            result = result.where(params)
        }
        return Actor.serialize(await result)
    }

    async RegisterNewActor(actor: any): Promise<Actor> {
        const result = await database('actors').insert(actor, ["*"]);
        return this.FindActor({id: result[0]})
    }

}

export const actorRepository = new ActorRepositoryInMysql();