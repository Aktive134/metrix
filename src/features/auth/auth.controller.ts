import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../user/user.model';
import Constant from '../../constant';
import Configuration from '../../config';
import catchAsync from '../../common/error-handler/CatchAsyncError';
import middlewares from '../../middleware';
import errors from '../../common/error-handler';
import utils from '../../lib';
import generateToken from '../../lib/generate-token';


const {messages, statusCode} = Constant;
const { BadRequestError, NotAuthorizeError } = errors;
const { generateRandomString } = utils;

class AuthController {
    signuphandler = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const { username, email, image, password } = req.body;
        const newUser = new User({ username, email, image, password });
        const salt = await bcrypt.genSalt(Configuration.saltFactor);
        const hashPassword = await bcrypt.hash(password, salt);
        newUser.password = hashPassword;
        newUser.image = generateRandomString();

        const user = await newUser.save();
        if(user){
            return res.status(statusCode.CREATED).json({
                message: messages.userCreated,
                data: {
                  id: user._id,
                  username: user.username,
                  email: user.email
                },
                status: true,
            });
        };
        return next(new BadRequestError("Failed to create user"));
    });

    loginHandler = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const { identity, password } = req.body;
        

        if(!identity || !password) {
            return next(new BadRequestError("Incomplete login details"));
        }
        const user = await User.findOne({
            $or: [{username: identity}, {email: identity}]
        });
        

        if (!user) {
            return next(new NotAuthorizeError(messages.invalidCredential));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return next(new NotAuthorizeError(messages.invalidCredential));
        }

        const token = generateToken(user);

        return res.status(statusCode.OK).json({
            message: messages.successfulLogin,
            data: {
              token,
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
              },
            },
            status: true,
          });
    })
}

export default new AuthController()
