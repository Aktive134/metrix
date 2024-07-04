import Constant from "../../constant";
import BaseError from "./BaserError";

class ForbiddenError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.name = Constant.errorName.forbidden;
        this.statusCode = Constant.statusCode.FORBIDDEN;
        this.message = msg;
    }
}

export default ForbiddenError;
