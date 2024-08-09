import { Router } from 'express'
import validateUser from '../../middleware/validate-user';
import authController from './auth.controller'
import passport from 'passport';

const {
    signuphandler,
    loginHandler,
    googleAuthHandler,
    googleSignInHandler
} = authController;


const authRouter = Router()

authRouter.post("/sign-up", validateUser, signuphandler);
authRouter.post("/login", loginHandler);
authRouter.post("/auth/google", googleAuthHandler);
authRouter.get("/auth/google/callback", googleSignInHandler);

export default authRouter




