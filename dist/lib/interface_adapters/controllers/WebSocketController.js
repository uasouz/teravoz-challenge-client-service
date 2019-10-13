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
const message_1 = require("../../frameworks_drivers/websocket_server/message");
const CallRepositoryInMysql_1 = require("../storage/CallRepositoryInMysql");
const EventRepositoryInMysql_1 = require("../storage/EventRepositoryInMysql");
function ListCalls(ws, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const calls = yield CallRepositoryInMysql_1.callRepository.FindCall(message.data.params);
        ws.send(message_1.createMessage(calls, "ListCalls").toString());
    });
}
exports.ListCalls = ListCalls;
function ListCallEvents(ws, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield EventRepositoryInMysql_1.eventRepository.FindEvent({ aggregate_id: message.data.call_id });
        ws.send(message_1.createMessage(events, "ListCallEvents").toString());
    });
}
exports.ListCallEvents = ListCallEvents;
//# sourceMappingURL=WebSocketController.js.map