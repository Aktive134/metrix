import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import catchAsync from '../common/error-handler/CatchAsyncError';

const validateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.email) {
        req.body.email = req.body.email.trim().toLowerCase();
    }
    if (req.body.username) {
        req.body.username = req.body.username.trim().toLowerCase();
    }

    const Schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
        image: Joi.string().optional()
    });

    await Schema.validateAsync(req.body);
    next();
});

export default validateUser;
