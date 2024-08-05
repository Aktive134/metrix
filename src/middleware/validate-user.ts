import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import catchAsync from '../common/error-handler/CatchAsyncError';

const validateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const Schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        image: Joi.string()
    });
    await Schema.validateAsync(req.body);
    next();
});


export default validateUser;