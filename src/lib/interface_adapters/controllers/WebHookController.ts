import {Request, Response} from "express";
import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ValidateCallEvent} from "../../application_business_rules/use_cases/ValidateEvent";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {BaseResponse} from "../util/response";
import {RegisterNewCall} from "../../application_business_rules/use_cases/RegisterNewCall";
import {callRepository} from "../storage/CallRepositoryInMysql";
import {SetCallState} from "../../application_business_rules/use_cases/SetCallState";
import {SerializeAndValidateCallEvent} from "../../application_business_rules/use_cases/SerializeAndValidateCallEvent";
import {Delegate} from "../../enterprise_business_rules/services/teravoz";

//Handles call.new event,if no Duplicate event was created
// it inserts a new Call Register on the Database with NEW state
// and Register a event to it
export async function CallNew(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if(!callEventResult.success){
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
    if(!callEventResult.success){
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const delegateResult = Delegate(callEventResult.data.call_id);
    if(delegateResult.status!="ok"){
        return BaseResponse.Fail(res, ["Delegate Failed"])
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}

export async function CallWaiting(req: Request, res: Response) {
    const callEventResult = SerializeAndValidateCallEvent(req.body);
    if(!callEventResult.success){
        return BaseResponse.Fail(res, callEventResult.errors)
    }
    const setCallStatusResult = await SetCallState(callEventResult.data, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEventResult.data);
    return BaseResponse.Succeed(res, event)
}