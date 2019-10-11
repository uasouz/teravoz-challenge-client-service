"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(name, defaultAcceptedStates = []) {
        this.acceptedNextStates = [];
        this.name = name;
        for (let defaultState of defaultAcceptedStates) {
            this.addAcceptedState(defaultState);
        }
    }
    transitTo(next) {
        return this.acceptedNextStates.includes(next);
    }
    addAcceptedState(state) {
        this.acceptedNextStates.push(state);
    }
}
exports.State = State;
class StateTrasition {
    constructor(initialState, defaultStates = {}) {
        this.states = new Map();
        const statesMap = new Map(Object.entries(defaultStates));
        this.currentState = statesMap.get(initialState);
        this.states = statesMap;
    }
    doStateTransition(stateName = "") {
        if (this.states.get(stateName) != undefined && this.currentState.transitTo(stateName)) {
            this.currentState = this.states.get(stateName);
            return true;
        }
        return false;
    }
}
exports.StateTrasition = StateTrasition;
//# sourceMappingURL=state-trasition.js.map