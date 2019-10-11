import {Events} from "../../frameworks_drivers/webserver/events";

function IsValidEvent(event: any) {
    return Object.values(Events).includes(event.type)
}

function getEventCategory(event: any) {
    return event.type.split(".")[0]
}

function isCallEvent(eventType: string) {
    return eventType === "call"
}

//Validates CallEvent by checking if it is a valid event and if is a `call.` event
export function ValidateCallEvent(event: any) {
    const eventTypeExists = IsValidEvent(event);
    if(eventTypeExists){
        if(isCallEvent(getEventCategory(event))){
            return true
        }
        return false
    }
    return false
}