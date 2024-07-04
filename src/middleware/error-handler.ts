import { Request, Response, NextFunction } from "express";
import ApplicationError from "../common/error-handler/ApplicationError";
import BadRequestError from "../common/error-handler/BadRequestError";
import ForbiddenError from "../common/error-handler/ForbiddenError";
import NotAuthorizeError from "../common/error-handler/NotAuthorizedError";
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
    err: ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorAlert = new ErrorAlert(err.message, err.name);
    errorAlert.notify();
    
    const errorMessage = `${req.ip} : ${req.method} ${req.url} ${err.statusCode} :${err.name} ${err.message} `;
    
    fileLogger.log({
        message: errorMessage,
        level: "error"
    });

    const { message } = err;
    const body: IBody = {
        message: message,
        statusCode: err.statusCode ? err.statusCode : 500,
        data: {} , 
        status : false
    };

    if (err instanceof ApplicationError) {
        body.message = Constant.messages;
        response(res,  body);
    } else {
        response(res,  body);
    }
};

export default errorHandler;
