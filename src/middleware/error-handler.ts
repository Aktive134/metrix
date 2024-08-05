import { Request, Response, NextFunction } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizedError";
import BaseError from "../common/error-handler/BaserError";
import ErrorAlert from "../common/monitoring/ErrorAlert";
import response, { IBody } from "../lib/http-response";
import fileLogger from "../common/logging/error-logger";
import Constant from "../constant";

type ErrorType =
    | ApplicationError
    | BadRequestError
    | NotAuthorizeError
    | ForbiddenError;

const errorHandler = (
    err: ErrorType, // Use Error type for broader error handling
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();

    // Log the complete error for debugging
    fileLogger.log({ message: err.stack ? err.stack : 'An error occurred', level: "error" });


    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;
    fileLogger.log({ message: errorMessage, level: "error" });

    const body: IBody = {
        message: "Internal Server Error", // Default message
        statusCode: err.statusCode ? err.statusCode : 500,
        data: {},
        status: false,
    };

    // Check for Mongoose duplicate key error (assuming 'code' property exists)
    if (err.code && err.code === 11000) {
        // Extract the duplicate value
        console.log(err.keyValue);
        const key = Object.keys(err.keyValue);
    
        let duplicateMessage = "Duplicate key error. Please check your data.";
        if (key) {
            duplicateMessage = `${key} already exists. Please check your data.`;
        }
    
        body.message = duplicateMessage;
        body.statusCode = 400;
    } else if (err instanceof ApplicationError || err instanceof BadRequestError || err instanceof NotAuthorizeError || err instanceof ForbiddenError) {
        body.message = err.message;
    } else {
        console.error("Unhandled error:", err);
    }

    response(res, body);
};

export default errorHandler;
