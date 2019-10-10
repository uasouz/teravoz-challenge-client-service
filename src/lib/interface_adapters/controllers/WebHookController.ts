import {Request, Response} from "express";
import {Call} from "../../enterprise_business_rules/models/Call";
import {ValidateCall} from "../../application_business_rules/use_cases/ValidateEvent";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {BaseResponse} from "../util/response";

export async function CallNew (req:Request,res: Response) {
    const call = Call.serialize(req.body);
    const isValidCall = ValidateCall(call);
    if(!isValidCall){
        return BaseResponse.Fail(res, {})
    }
    const event = await eventRepository.RegisterEvent(call);
    return BaseResponse.Succeed(res, event)
}