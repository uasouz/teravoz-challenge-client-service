import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {callRepository} from "../storage/CallRepositoryInMysql";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {WebSocket} from "uWebSockets.js"

export async function ListCalls(ws: WebSocket, message: Message) {
    const calls = await callRepository.FindCall(message.data.params);
    ws.send(createMessage(calls, "ListCalls").toString())
}

export async function ListCallEvents(ws: WebSocket, message: Message) {
    const events = await eventRepository.FindEvent({aggregate_id: message.data.call_id});
    ws.send(createMessage(events, "ListCallEvents").toString());
}