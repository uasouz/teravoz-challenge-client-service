"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Set of Events possible to be received on WebHook
var Events;
(function (Events) {
    //Call Events
    Events["CallNew"] = "call.new";
    Events["CallStandby"] = "call.standby";
    Events["CallWaiting"] = "call.waiting";
    Events["CallOngoing"] = "call.ongoing";
    Events["CallOverflow"] = "call.overflow";
    Events["CallFollowMe"] = "call.follow-me";
    Events["CallFinished"] = "call.finished";
    Events["CallRecordingAvailable"] = "call.recording-available";
    Events["CallQueueAbandon"] = "call.queue-abandon";
    //Actor Events
    Events["ActorLoggedIn"] = "actor.logged-in";
    Events["ActorLoggedOut"] = "actor.logged-out";
    Events["ActorEntered"] = "actor.entered";
    Events["ActorLeft"] = "actor.left";
    Events["ActorRinging"] = "actor.ringing";
    Events["ActorNoAnswer"] = "actor.noanswer";
    Events["ActorPaused"] = "actor.paused";
    Events["ActorUnpaused"] = "actor.unpaused";
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=events.js.map