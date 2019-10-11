//This is the mocked TeraVoz API Client

function createDelegation(call_id: string,destination: string) {
    return {
        type: "delegate",
        call_id: call_id,
        destination: destination
    }
}

function mockConsumeDelegation(delegation: any) {
    if(delegation.type === "delegate"){
        return {
            status: "ok"
        }
    }
    return {
        status: "fail"
    }
}

export function Delegate(call_id: string,destination: string = "900") {
    const delegation = createDelegation(call_id,destination);
    return mockConsumeDelegation(delegation)
}