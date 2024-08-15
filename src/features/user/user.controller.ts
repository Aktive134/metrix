import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from './user.model';
import Constant from '../../constant';
import catchAsync from '../../common/error-handler/CatchAsyncError';
import errors from '../../common/error-handler';
import { uploadImage } from '../../lib/utils';

const { messages, statusCode } = Constant;
const { BadRequestError, NotAuthorizeError } = errors;

class UserController {
    userProfileHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.payload._id;
        const { username, password } = req.body;

        if (!userId) {
            return next(new NotAuthorizeError('User not authorized'));
        };

        const user = await User.findById(userId);
        if (!user) {
            return next(new BadRequestError('User not found'));
        };

        if (username) {
            user.username = username;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (req.file) {
            const { buffer } = req.file;
            const uploadResult = await uploadImage(buffer, 'users-profile-images');
            user.image = uploadResult.secure_url;
        }

        await user.save();

        res.status(statusCode.OK).json({
            message: 'Profile updated successfully',
            data: user,
            status: true
        });
    });
}

export default new UserController();
