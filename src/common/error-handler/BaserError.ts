class BaseError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
    }
    keyValue?: any;
    code?: number;
}

// class BaseError extends Error {
//     public statusCode: number;

//     constructor(name: string, statusCode: number, message: string) {
//         super(message);
//         this.name = name;
//         this.statusCode = statusCode;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

export default BaseError;