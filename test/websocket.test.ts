import {app} from "../src";

const WebSocket = require('ws');

describe('Test WebHook Calls', function () {


    before((done => {
        // app.start();
        done();
    }));


    it("Test ListCalls command", (done => {
        const ws = new WebSocket("ws://localhost:4000");
        ws.on("message", (message: any) => {
            const msg = JSON.parse(message);
            if (msg.data.command == "ListCalls") {
                msg.data.should.be.an.array();
            }
            done();
        });
        const payload = {
            "event": "ListCalls",
            "data": {
                "params": {
                    "state": "ONGOING"
                }
            }
        };
        ws.on("connection", () => {
            ws.send(JSON.stringify(payload));
        });
    }))

    it("Test ListCallEvents command", (done => {
        const ws = new WebSocket("ws://localhost:4000");
        ws.on("message", (message: any) => {
            const msg = JSON.parse(message);
            if (msg.data.command == "ListCallEvents") {
                msg.data.should.be.an.array();
            }
            done();
        });
        const payload = {
            "event": "ListCallEvents",
            "data": {
                "call_id": "1463669263.30041"
            }
        };
        ws.on("connection", () => {
            ws.send(JSON.stringify(payload));
        });
    }))

});