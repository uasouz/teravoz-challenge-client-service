"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Transform to serializer(?)
class Message {
    constructor(data, event, status) {
        this.data = data;
        this.event = event;
        this.status = status;
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Message = Message;
function validateMessage(data) {
    return data.hasOwnProperty("event") && data.hasOwnProperty("data");
}
exports.validateMessage = validateMessage;
function createMessage(data, event, status = 'Ok') {
    return new Message(data, event, status);
}
exports.createMessage = createMessage;
//# sourceMappingURL=message.js.map