import {Request, Response} from "express";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {BaseResponse} from "../util/response";
import {RegisterNewCall} from "../../application_business_rules/use_cases/RegisterNewCall";
import {callRepository} from "../storage/CallRepositoryInMysql";
import {SetCallState} from "../../application_business_rules/use_cases/SetCallState";
import {
    SerializeAndValidateActorEvent,
    SerializeAndValidateCallEvent
} from "../../application_business_rules/use_cases/SerializeAndValidateEvent";
import {Delegate} from "../../enterprise_business_rules/services/teravoz";
import {actorRepository} from "../storage/ActorRepositoryInMysql";
import {RegisterNewActor} from "../../application_business_rules/use_cases/RegisterNewActor";

//Call Events Handlers

//Handles call.new event,if no Duplicate event was created
// it inserts a new Call Register on the Database with NEW state
// and Register a event to it
export async function CallNew(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if (!callEventResult.success) {
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const registerCallResult = await RegisterNewCall(callEventResult.data, callRepository);
    if (registerCallResult.success) {
        const event = await eventRepository.RegisterEvent(callEventResult.data);
        return BaseResponse.Succeed(res, event)
    }
    return BaseResponse.Fail(res, registerCallResult.errors)
}

//Handles call.standby event
// If the databasa already contains a Call with the informed call_id and with state equal to NEW,
// it sets it to StandBy and executes the delegation Operation,
// in the end adds a new event to this call
export async function CallStandBy(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if (!callEventResult.success) {
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const delegateResult = Delegate(callEventResult.data.call_id);
    if (delegateResult.status != "ok") {
        return BaseResponse.Fail(res, ["Delegate Failed"])
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}

// Handle the call.waiting event
// Set the call state to WAITING and records a event to it
export async function CallWaiting(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if (!callEventResult.success) {
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}


// Handle the call.Ongoing event
// Set the call state to ONGOING and records a event to it
export async function CallOngoing(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if (!callEventResult.success) {
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}


// Handle the call.finished event
// Set the call state to FINISHED and records a event to it
export async function CallFinished(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if (!callEventResult.success) {
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}

//Actor Events Handlers

// Handle the actor.entered event
// Check if it is a valid Actor event and if it is,
// saves a event related to the call he joined
// If the actor does no exists in database,it creates a new Actor
export async function ActorEntered(req: Request, res: Response) {
    const actorEventResult = SerializeAndValidateActorEvent(req.body);
    if (!actorEventResult.success) {
        return BaseResponse.Fail(res, actorEventResult.errors)
    }
    const registerActorResult = await RegisterNewActor(actorEventResult.data,actorRepository);
    if (registerActorResult.success) {
        const event = await eventRepository.RegisterEvent(actorEventResult.data);
        return BaseResponse.Succeed(res, event)
    }
    return BaseResponse.Fail(res, registerActorResult.errors)
}

// Handle the actor.left event
// Check if it is a valid Actor event and if it is,
// saves a event related to the call he joined
export async function ActorLeft(req: Request, res: Response) {
    const actorEventResult = SerializeAndValidateActorEvent(req.body);
    if (!actorEventResult.success) {
        return BaseResponse.Fail(res, actorEventResult.errors)
    }
    const event = await eventRepository.RegisterEvent(actorEventResult.data);
    return BaseResponse.Succeed(res, event)
}