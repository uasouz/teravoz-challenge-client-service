import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ValidateCallEvent} from "./ValidateEvent";
import {BaseResponse} from "../../interface_adapters/util/response";
import {Result} from "../../enterprise_business_rules/util/result";


export function SerializeAndValidateCallEvent(data: any){
    const callEvent = CallEvent.serialize(data);
    const isValidCallEvent = ValidateCallEvent(callEvent);
    if (!isValidCallEvent) {
        return Result.Fail(["Invalid Call Event"])
    }
    return Result.Succeed(callEvent)
}