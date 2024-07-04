class BaseError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
    }
}

export default BaseError;