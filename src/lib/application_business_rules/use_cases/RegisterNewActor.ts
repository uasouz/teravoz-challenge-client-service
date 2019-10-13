import {Events} from "../../frameworks_drivers/webserver/events";
import {Result} from "../../enterprise_business_rules/util/result";
import {ActorEvent} from "../../enterprise_business_rules/models/ActorEvent";
import {IActorRepository} from "../repositories/ActorRepository";
import {createBinaryUUID} from "../../util/binary-uuid/binary-uuid";

function CreateNewActor(actor: ActorEvent) {
    return {
        uuid: createBinaryUUID().buffer,
        actor: actor.actor,
        number: actor.number
    }
}

//Check if the email already exists on database
async function ActorIsDuplicate(email: string, actorRepository: IActorRepository) {
    return (await actorRepository.FindActor({email: email})) != undefined
}

//Receives an Actor event and check if this event contains a new Actor,
//if it contains a new Actor then this new actor is recorded to the database
export async function RegisterNewActor(actorEvent: ActorEvent, actorRepository: IActorRepository) {
    if (actorEvent.type === Events.CallNew && !await ActorIsDuplicate(actorEvent.actor, actorRepository)) {
        const registerResult = await actorRepository.RegisterNewActor(CreateNewActor(actorEvent));
        return Result.Succeed(registerResult)
    } else {
        return Result.Fail("Failed to register actor - Wrong type of event or event duplicated",
            false,
            "Failed to register actor - Wrong type of event or event duplicated")
    }
}