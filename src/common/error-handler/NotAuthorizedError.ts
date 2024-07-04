import Constant from "../../constant";
import BaseError from "./BaserError";

class NotAuthorizeError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, NotAuthorizeError.prototype);
        this.name = Constant.errorName.notAuthorize;
        this.statusCode = Constant.statusCode.UNAUTHORIZED;
        this.message = msg;
    }
}

export default NotAuthorizeError;
