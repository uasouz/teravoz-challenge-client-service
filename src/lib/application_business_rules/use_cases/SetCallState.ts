import {CallEvent} from "../../enterprise_business_rules/models/CallEvent";
import {ICallRepository} from "../repositories/CallRepository";
import {BaseResponse} from "../../interface_adapters/util/response";
import {callRepository} from "../../interface_adapters/storage/CallRepositoryInMysql";
import {Result} from "../../enterprise_business_rules/util/result";

const States = new Map(Object.entries({
    "call.new": "NEW",
    "call.standby": "STANDBY",
    "call.waiting": "WAITING",
    "call.ongoing": "ONGOING",
    "call.finished": "FINISHED"
}));

export async function SetCallState(callEvent: CallEvent, callRepository: ICallRepository) {
    const call = await callRepository.FindCall({aggregate_id: callEvent.call_id});
    if (!call) {
        return Result.Fail(["This call is not registered on our database"])
    }
    if (!call.doStateTransition(States.get(callEvent.type))) {
        return Result.Fail(["This state transition is not allowed for this Call"])
    }
    const setCallStatusData = await callRepository.SetCallState(callEvent.call_id, States.get(callEvent.type)!!);
    return Result.Succeed(setCallStatusData)
}