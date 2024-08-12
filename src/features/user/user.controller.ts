import { Request, Response, NextFunction } from 'express';
import User from './user.model';
import Constant from '../../constant';
import catchAsync from '../../common/error-handler/CatchAsyncError';
import errors from '../../common/error-handler';
import { uploadImage } from '../../lib/utils';

const { messages, statusCode } = Constant;
const { BadRequestError } = errors;

class UserController {
    userProfileHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.file)
        if (!req.file) {
            return next(new BadRequestError("No file uploaded"));
        }

        const { buffer } = req.file;

        const uploadResult = await uploadImage(buffer, 'users-profile-images');

        res.status(statusCode.OK).json({
            message: 'Profile set-up successful',
            data: uploadResult,
            status: true
        });
    });
}

export default new UserController();
