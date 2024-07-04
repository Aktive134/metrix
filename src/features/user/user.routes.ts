import { Router } from 'express'
import userController from './user.controller'
import validateAdmin from '../../middleware/validate-admin'

const userRouter = Router()



export default userRouter
