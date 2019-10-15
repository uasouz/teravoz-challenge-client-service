// Serializes and respond data,messages and errors from the Web Service
export class BaseResponse {
    success: boolean;
    code: number;
    data?: any;
    message?: string;
    errors?: any;

    constructor(success = false, code = 500, data = null, errors = null, message: string = "") {
        this.success = success;
        this.code = code;
        data ? this.data = data : "";
        errors ? this.errors = errors : "";
        this.message = message;
    }

    static Succeed(res: any, data: any,  code = 200, success = true,message = "") {
        res.status(code);
        const response = new this(success, code, data, null, message);
        res.json(response);
        return response;
    }

    static Fail(res: any, errors: any,  code = 500, success = false, message = "") {
        res.status(code);
        const response = new this(success, code, null, errors, message)
        res.json(response);
        return response
    }
}