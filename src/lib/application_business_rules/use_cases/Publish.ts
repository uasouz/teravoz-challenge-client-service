import uWsServer from "../../frameworks_drivers/websocket_server/server";

export function Publish(topic: string, message: any,wsServer: uWsServer ) {
    wsServer.publish(topic,message)
}