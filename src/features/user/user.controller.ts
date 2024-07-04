import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from './user.model'
import Constant from '../../constant'
import Configuration from '../../config'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import ApplicationError from '../../common/error-handler/ApplicationError'
import generateToken from '../../lib/generate-token'

const Messages = Constant.messages

class UserController {
  
}

export default new UserController()
