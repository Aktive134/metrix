import ApplicationError from "./ApplicationError";
import BadRequestError from "./BadRequestError";
import NotAuthorizeError from "./NotAuthorizedError";
import ForbiddenError from "./ForbiddenError";
import NotFoundError from "./NotFoundError";

const errors = {
    NotFoundError,
    ApplicationError,
    BadRequestError,
    ForbiddenError,
    NotAuthorizeError
};

export default errors;
