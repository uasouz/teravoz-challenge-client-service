import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {callRepository} from "../storage/CallRepositoryInMysql";
import {eventRepository} from "../storage/EventRepositoryInMysql";
import {WebSocket} from "uWebSockets.js"

// Search for calls based on the informed params
export async function ListCalls(ws: WebSocket, message: Message) {
    const calls = await callRepository.ListCalls(message.data.params);
    ws.send(createMessage(calls ? calls : [], "ListCalls").toString())
}

// List all events for the given call_id
export async function ListCallEvents(ws: WebSocket, message: Message) {
    const events = await eventRepository.ListEvents({aggregate_id: message.data.call_id});
    ws.send(createMessage(events, "ListCallEvents").toString());
}