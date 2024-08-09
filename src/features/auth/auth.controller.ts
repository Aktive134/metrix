import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import User from '../user/user.model';
import Constant from '../../constant';
import Configuration from '../../config';
import catchAsync from '../../common/error-handler/CatchAsyncError';
import errors from '../../common/error-handler';
import utils from '../../lib';
import generateToken from '../../lib/generate-token';
import { getUserData } from '../../lib/utils';

const { messages, statusCode } = Constant;
const { BadRequestError, NotAuthorizeError } = errors;
const { generateRandomString } = utils;
const { OAuth: { client_id, client_secret, callback_url } } = Configuration;

class AuthController {
    signuphandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, image, password } = req.body;
        const newUser = new User({ username, email, image, password });
        const salt = await bcrypt.genSalt(Configuration.saltFactor);
        const hashPassword = await bcrypt.hash(password, salt);
        newUser.password = hashPassword;
        newUser.image = generateRandomString();

        const user = await newUser.save();
        if (user) {
            return res.status(statusCode.CREATED).json({
                message: messages.userCreated,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                status: true,
            });
        }
        return next(new BadRequestError("Failed to create user"));
    });

    loginHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { identity, password } = req.body;
        
        if (!identity || !password) {
            return next(new BadRequestError("Incomplete login details"));
        }
        const user = await User.findOne({
            $or: [{ username: identity.toLowerCase() }, { email: identity.toLowerCase() }]
        });

        if (!user) {
            return next(new NotAuthorizeError(messages.invalidCredential));
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
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
    });

    googleAuthHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const oAuth2Client = new OAuth2Client(client_id, client_secret, callback_url);
    
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
            prompt: 'consent',
        });
    
        res.json({ url: authorizeUrl });
    });
    
    googleSignInHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const code = req.query.code as string;
    
        if (!code) {
            return res.status(400).json({ message: 'Authorization code is missing.' });
        }
    
            const oAuth2Client = new OAuth2Client(client_id, client_secret, callback_url);
    
            const { tokens } = await oAuth2Client.getToken(code);
            if (!tokens) {
                return res.status(500).json({ message: 'Failed to retrieve tokens.' });
            }
    
            oAuth2Client.setCredentials(tokens);
            const userData = await getUserData(tokens.access_token as string);
    
            if (!userData) {
                return res.status(500).json({ message: 'Failed to retrieve user data.' });
            }
    
            let user = await User.findOne({ googleId: userData.sub });
            if (!user) {
                const mergedName = (userData.given_name + userData.family_name).toLowerCase();
    
                user = new User({
                    username: mergedName,
                    email: userData.email,
                    image: userData.picture,
                    googleId: userData.sub,
                });
    
                await user.save();
            }
    
            const token = generateToken(user);
    
            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    image: user.image,
                },
            });
        
    });
    
}

export default new AuthController();
