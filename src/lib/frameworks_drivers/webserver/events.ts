export enum Events {
    //Call Events
    "call.new" = "CallNew",
    "call.standby" = "CallStandby",
    "call.waiting" = "CallWaiting",
    "call.ongoing" = "CallOngoing",
    "call.overflow" = "CallOverflow",
    "call.follow-me" = "CallFollowMe",
    "call.finished" = "CallFinished",
    "call.recording-available" = "CallRecordingAvailable",
    "call.queue-abandon" = "CallQueueAbandon",

    //Actor Events
    "actor.logged-in" = "ActorLoggedIn",
    "actor.logged-out" = "ActorLoggedOut",
    "actor.entered" = "ActorEntered",
    "actor.left" = "ActorLeft",
    "actor.ringing" = "ActorRinging",
    "actor.noanswer" = "ActorNoAnswer",
    "actor.paused" = "ActorPaused",
    "actor.unpaused" = "ActorUnpaused",
}