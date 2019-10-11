import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ICallRepository} from "../repositories/CallRepository";

enum Status {
    "call.new" = "NEW",
    "call.standby" = "STANDBY",
    "call.waiting" = "WAITING",
    "call.ongoing" = "ONGOING",
    "call.finished" = "FINISHED"
}

export async function SetCallStatus(callEvent: CallEvent,callRepository: ICallRepository) {
    // @ts-ignore
    return await callRepository.SetCallStatus(callEvent.call_id,Status[callEvent.type])
}