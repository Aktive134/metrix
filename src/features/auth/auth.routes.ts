import { Router } from 'express'
import validateUser from '../../middleware/validate-user';
import authController from './auth.controller'

const {
    signuphandler,
    loginHandler
} = authController;


const authRouter = Router()

authRouter.post("/sign-up", validateUser, signuphandler);
authRouter.post("/login",  loginHandler);


export default authRouter
