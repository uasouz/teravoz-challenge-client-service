import {Request, Response} from "express";
import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ValidateCallEvent} from "../../application_business_rules/use_cases/ValidateEvent";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {BaseResponse} from "../util/response";
import {RegisterNewCall} from "../../application_business_rules/use_cases/RegisterNewCall";
import {callRepository} from "../storage/CallRepositoryInMysql";
import {SetCallState} from "../../application_business_rules/use_cases/SetCallState";

export async function CallNew(req: Request, res: Response) {
    const callEvent = CallEvent.serialize(req.body);
    const isValidCall = ValidateCallEvent(callEvent);
    if (!isValidCall) {
        return BaseResponse.Fail(res, {})
    }
    const registerCallResult = await RegisterNewCall(callEvent, callRepository);
    if (registerCallResult.success) {
        const event = await eventRepository.RegisterEvent(callEvent);
        return BaseResponse.Succeed(res, event)
    }
    return BaseResponse.Fail(res, registerCallResult.errors)
}

export async function CallStandBy(req: Request, res: Response) {
    const callEvent = CallEvent.serialize(req.body);
    const isValidCallEvent = ValidateCallEvent(callEvent);
    if (!isValidCallEvent) {
        return BaseResponse.Fail(res, {})
    }
    const setCallStatusResult = await SetCallState(callEvent, callRepository);
    if (!setCallStatusResult.success) {
        return BaseResponse.Fail(res, setCallStatusResult.errors)
    }
    const event = await eventRepository.RegisterEvent(callEvent);
    return BaseResponse.Succeed(res, event)
}