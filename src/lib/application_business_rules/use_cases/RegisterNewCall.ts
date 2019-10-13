import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ICallRepository} from "../repositories/CallRepository";
import {Events} from "../../frameworks_drivers/webserver/events";
import {Result} from "../../enterprise_business_rules/util/result";

//Creates a new Call object for saving to database
function CreateNewCall(call: CallEvent) {
    return {
        aggregate_id: call.call_id,
        state: "NEW"
    }
}

//Check if the call_id already exists on database
async function CallIsDuplicate(call_id: string, callRepository: ICallRepository) {
    return (await callRepository.FindCall({aggregate_id: call_id})) != undefined
}

//Receives a call event and check if this event is a new call,
//if it is a new call,it creates a new call on the call register with the NEW status
export async function RegisterNewCall(call: CallEvent, callRepository: ICallRepository) {
    if (call.type === Events.CallNew && !await CallIsDuplicate(call.call_id, callRepository)) {
        const registerResult = await callRepository.RegisterNewCall(CreateNewCall(call));
        return Result.Succeed(registerResult)
    } else {
        return Result.Fail("Failed to register call - Wrong type of event or event duplicated", //Errors can be acumutaled and passed here
            false,
            "Failed to register call - Wrong type of event or event duplicated")
    }
}