import { Response } from "express";

export interface IBody{
    statusCode: number;
    message: string | any;
    data: string | number | Record<string,any>[] | Record<string,any>;
    status : boolean
}

const response = (res: Response, body: IBody) => {
    return res.status(body.statusCode).json(body);
};

export default response;
