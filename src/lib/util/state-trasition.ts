export class State {
    name: string;
    acceptedNextStates: string[] = [];

    constructor(name: string, defaultAcceptedStates: string[] = []) {
        this.name = name;
        for (let defaultState of defaultAcceptedStates) {
            this.addAcceptedState(defaultState)
        }
    }

    transitTo(next: string) {
        return this.acceptedNextStates.includes(next)
    }

    addAcceptedState(state: string) {
        this.acceptedNextStates.push(state)
    }
}

export class StateTrasition {
    private currentState?: State;
    private states = new Map<string, State>();

    constructor(initialState: string, defaultStates = {}) {
        const statesMap = new Map<string, State>(Object.entries(defaultStates));
        this.currentState = statesMap.get(initialState);
        this.states = statesMap
    }

    doStateTransition(stateName: string = "") {
        if (this.states.get(stateName) != undefined && this.currentState!!.transitTo(stateName)) {
            this.currentState = this.states.get(stateName);
            return true
        }
        return false
    }

}