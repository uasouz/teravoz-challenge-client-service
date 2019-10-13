import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ValidateActorEvent, ValidateCallEvent} from "./ValidateEvent";
import {Result} from "../../enterprise_business_rules/util/result";
import {ActorEvent} from "../../enterprise_business_rules/models/ActorEvent";


export function SerializeAndValidateCallEvent(data: any){
    const callEvent = CallEvent.serialize(data);
    const isValidCallEvent = ValidateCallEvent(callEvent);
    if (!isValidCallEvent) {
        return Result.Fail(["Invalid Call Event"])
    }
    return Result.Succeed(callEvent)
}

export function SerializeAndValidateActorEvent(data: any){
    const actorEvent = ActorEvent.serialize(data);
    const isValidCallEvent = ValidateActorEvent(actorEvent);
    if (!isValidCallEvent) {
        return Result.Fail(["Invalid Actor Event"])
    }
    return Result.Succeed(actorEvent)
}