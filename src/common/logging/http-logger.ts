import morgan from "morgan";
import { Request, Response } from "express";

const customFormat = (token: any, req: Request, res: Response) => {
    return [
        token["remote-addr"](req, res),
        token.date(req, res),
        token.method(req, res),
        "HTTP/",
        token["http-version"](req, res),
        token.url(req, res),
        token.status(req, res),
        "TTM",
        token["response-time"](req, res),
        "ms",
        "TRT",
        token["total-time"](req, res),
        "ms",
        token.res(req, res, "Content-length"),
        token["user-agent"](req, res)
    ].join(" ");
};

const httpLogger = morgan(customFormat, {
    immediate: false,
});

export default httpLogger;
