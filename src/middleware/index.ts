import validateAdmin from "./validate-admin";
import validateToken from "./validate-token";
import validateUser from "./validate-user";

const middlewares = {
    validateAdmin, validateToken, validateUser
} 

export default middlewares;