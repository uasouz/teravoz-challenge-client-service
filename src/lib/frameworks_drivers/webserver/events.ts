export enum Events {
    //Call Events
    "CallNew" = "call.new",
    "CallStandby" = "call.standby",
    "CallWaiting" = "call.waiting",
    "CallOngoing" = "call.ongoing",
    "CallOverflow" = "call.overflow",
    "CallFollowMe" = "call.follow-me",
    "CallFinished" = "call.finished",
    "CallRecordingAvailable" = "call.recording-available",
    "CallQueueAbandon" = "call.queue-abandon",

    //Actor Events
    "ActorLoggedIn" = "actor.logged-in",
    "ActorLoggedOut" = "actor.logged-out",
    "ActorEntered" = "actor.entered",
    "ActorLeft" = "actor.left",
    "ActorRinging" = "actor.ringing",
    "ActorNoAnswer" = "actor.noanswer",
    "ActorPaused" = "actor.paused",
    "ActorUnpaused" = "actor.unpaused",
}