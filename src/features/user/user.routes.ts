import { Router } from 'express'
import userController from './user.controller'
import validateAdmin from '../../middleware/validate-admin';

const { userProfileHandler } = userController;

const userRouter = Router();

userRouter.post('/user/set-profile', userProfileHandler);



export default userRouter
