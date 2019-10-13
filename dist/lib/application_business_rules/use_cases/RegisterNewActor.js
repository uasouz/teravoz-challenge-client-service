"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../frameworks_drivers/webserver/events");
const result_1 = require("../../enterprise_business_rules/util/result");
const binary_uuid_1 = require("../../util/binary-uuid/binary-uuid");
function CreateNewActor(actor) {
    return {
        uuid: binary_uuid_1.createBinaryUUID().buffer,
        email: actor.actor,
        number: actor.number
    };
}
//Check if the email already exists on database
function ActorIsDuplicate(email, actorRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield actorRepository.FindActor({ email: email })) != undefined;
    });
}
//Receives an Actor event and check if this event contains a new Actor,
//if it contains a new Actor then this new actor is recorded to the database
function RegisterNewActor(actorEvent, actorRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        if (actorEvent.type === events_1.Events.ActorEntered) {
            const isActorDuplicate = yield ActorIsDuplicate(actorEvent.actor, actorRepository);
            if (!isActorDuplicate) {
                const registerResult = yield actorRepository.RegisterNewActor(CreateNewActor(actorEvent));
                return result_1.Result.Succeed(registerResult);
            }
            return result_1.Result.Succeed(yield actorRepository.FindActor({ email: actorEvent.actor }));
        }
        else {
            return result_1.Result.Fail("Failed to register actor - Wrong type of event", false, "Failed to register actor - Wrong type of event");
        }
    });
}
exports.RegisterNewActor = RegisterNewActor;
//# sourceMappingURL=RegisterNewActor.js.map