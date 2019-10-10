"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matched = (x) => ({
    is: () => matched(x),
    otherwise: () => x,
});
exports.when = (x) => ({
    is: (predicate, fn) => {
        return (predicate(x) ? matched(fn(x)) : exports.when(x));
    },
    otherwise: (fn) => fn(x),
});
//# sourceMappingURL=when.js.map