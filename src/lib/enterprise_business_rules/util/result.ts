export class Result {
    success: boolean;
    data?: any;
    message?: string;
    errors?: any;

    constructor(success = false, data = null, errors = null, message: string = "") {
        this.success = success;
        data ? this.data = data : "";
        errors ? this.errors = errors : "";
        this.message = message;
    }

    static Succeed(data: any,  success = true,message = "") {
        return new this(success, data, null, message);
    }

    static Fail(errors: any, success = false, message = "") {
        return new this(success, null, errors, message);
    }
}