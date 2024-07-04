import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import User from '../user/user.model'
import Constant from '../../constant'
import Configuration from '../../config'
import catchAsync from '../../common/error-handler/CatchAsyncError'
import ApplicationError from '../../common/error-handler/ApplicationError'
import BadRequestError from '../../common/error-handler/BadRequestError'
import NotAuthorizeError from '../../common/error-handler/NotAuthorizedError'
import generateToken from '../../lib/generate-token'

const Messages = Constant.messages

class AuthController {
 
}

export default new AuthController()
