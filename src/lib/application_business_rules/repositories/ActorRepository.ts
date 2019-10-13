import {Actor} from "../../enterprise_business_rules/models/Actor";

//ActorRepository interface
export interface IActorRepository {

    FindActor(params: any): Promise<Actor>

    RegisterNewActor(actor: any): Promise<Actor>

}