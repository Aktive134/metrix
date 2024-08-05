import Constant from "../../constant";
import BaseError from "./BaserError";

class BadRequestError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.name = Constant.errorName.badRequest;
        this.statusCode = Constant.statusCode.BAD_REQUEST;
        this.message = msg;
    }
}

// class BadRequestError extends BaseError {
//     constructor(message: string) {
//         super(Constant.errorName.badRequest, Constant.statusCode.BAD_REQUEST, message);
//     }
// }

export default BadRequestError;
