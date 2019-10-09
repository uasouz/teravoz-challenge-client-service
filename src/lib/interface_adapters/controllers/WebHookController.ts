import {Request, Response} from "express";
import {Call} from "../../enterprise_business_rules/models/Call";
import {ValidateCall} from "../../application_business_rules/use_cases/ValidateEvent";

export function CallNew (req:Request,res: Response) {
    const call = Call.serialize(req.body);
    const isValidCall = ValidateCall(call)
}