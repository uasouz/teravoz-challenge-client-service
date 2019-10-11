"use strict";
//This is the mocked TeraVoz API Client
Object.defineProperty(exports, "__esModule", { value: true });
function createDelegation(call_id, destination) {
    return {
        type: "delegate",
        call_id: call_id,
        destination: destination
    };
}
function mockConsumeDelegation(delegation) {
    if (delegation.type === "delegate") {
        return {
            status: "ok"
        };
    }
    return {
        status: "fail"
    };
}
function Delegate(call_id, destination = "900") {
    const delegation = createDelegation(call_id, destination);
    return mockConsumeDelegation(delegation);
}
exports.Delegate = Delegate;
//# sourceMappingURL=teravoz.js.map