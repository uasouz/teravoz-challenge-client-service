"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(success = false, data = null, errors = null, message = "") {
        this.success = success;
        data ? this.data = data : "";
        errors ? this.errors = errors : "";
        this.message = message;
    }
    static Succeed(data, success = true, message = "") {
        return new this(success, data, null, message);
    }
    static Fail(errors, success = false, message = "") {
        return new this(success, null, errors, message);
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map