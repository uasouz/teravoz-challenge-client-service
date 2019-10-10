"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    //Call Events
    Events["call.new"] = "CallNew";
    Events["call.standby"] = "CallStandby";
    Events["call.waiting"] = "CallWaiting";
    Events["call.ongoing"] = "CallOngoing";
    Events["call.overflow"] = "CallOverflow";
    Events["call.follow-me"] = "CallFollowMe";
    Events["call.finished"] = "CallFinished";
    Events["call.recording-available"] = "CallRecordingAvailable";
    Events["call.queue-abandon"] = "CallQueueAbandon";
    //Actor Events
    Events["actor.logged-in"] = "ActorLoggedIn";
    Events["actor.logged-out"] = "ActorLoggedOut";
    Events["actor.entered"] = "ActorEntered";
    Events["actor.left"] = "ActorLeft";
    Events["actor.ringing"] = "ActorRinging";
    Events["actor.noanswer"] = "ActorNoAnswer";
    Events["actor.paused"] = "ActorPaused";
    Events["actor.unpaused"] = "ActorUnpaused";
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=events.js.map