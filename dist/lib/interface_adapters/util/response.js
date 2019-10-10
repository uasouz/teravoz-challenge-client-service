"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponse {
    constructor(success = false, code = 500, data = null, errors = null, message = "") {
        this.success = success;
        this.code = code;
        data ? this.data = data : "";
        errors ? this.errors = errors : "";
        this.message = message;
    }
    static Succeed(res, data, code = 200, success = true, message = "") {
        res.status(code);
        res.json(new this(success, code, data, null, message));
    }
    static Fail(res, errors, code = 500, success = false, message = "") {
        res.status(code);
        res.json(new this(success, code, null, errors, message));
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=response.js.map