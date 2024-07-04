import Constant from "../../constant";
import BaseError from "./BaserError";

class NotFoundError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.name = Constant.errorName.notFound;
        this.statusCode = Constant.statusCode.NOT_FOUND;
        this.message = msg;
    }
}

export default NotFoundError;
