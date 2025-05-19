const { adapterRequest } = require("../helpers/adapterRequest");
const userService = require("../services/databases/userService");
const authHelper = require("../helpers/authHelper");
const AppMessages = require("../constants/appMessages");

const {
    successResponse,
    internalServerError,
    genericErrorResponse,
    customSuccessResponse,
    badRequestResponse,
} = require("../helpers/responseHelper");

/**
 * Utility to check null or invalid database responses.
 */
const isValidDbResponse = (response) =>
    response && Object.keys(response).length > 0;
/**
 * @function createUser
 * @description Handles the creation of a new user account. Checks if the user already exists by email,
 *              encrypts the password, and creates the user account if not already registered.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Returns a success response with the created user details, or an error response
 */
exports.createUser = async (req, res) => {
    const httpRequest = adapterRequest(req); // Adapt the request for internal use

    try {
        const { fullName, email, password, } = httpRequest.body;
        // Check required fields
        if (!fullName || !email || !password) {
            return badRequestResponse(res, AppMessages.APP_BAD_REQUEST);
        }
        // Check if user already exists by email
        const userExists = await userService.getUserByEmail(email);
        if (isValidDbResponse(userExists)) {
            return genericErrorResponse(res, AppMessages.APP_DUPLICATE);
        }
        // Encrypt the user's password
        const encryptedPassword = await authHelper.encryptString(password);
        const newUser = await userService.createUserAccount(
            fullName,
            email,
            encryptedPassword,
        );
        if (!newUser) {
            return genericErrorResponse(
                res,
                AppMessages.APP_RESOURCE_CREATION_FAILED
            );
        }
        return successResponse(res, newUser);
    } catch (error) {
        // Handle any errors and return an internal server error response
        return internalServerError(res);
    }
};

/**
 * Handles the login process by validating user credentials and generating an authentication token.
 *
 * @param {Object} req - The HTTP request object, containing user credentials.
 * @param {Object} res - The HTTP response object, used to return the result to the client.
 * @returns {Object} - The response with a success or error message.
 */
exports.login = async (req, res) => {
    const httpRequest = adapterRequest(req);
    try {
        const { email, password } = httpRequest.body;
        if (!email || !password) {
            return badRequestResponse(res, AppMessages.APP_BAD_REQUEST);
        }
        let user = await userService.login(email, password);
        if (!isValidDbResponse(user)) {
            return genericErrorResponse(res, AppMessages.INVALID_USER_CREDENTIALS);
        }
        const isValidUser = await authHelper.isValidUser(password, user.password);
        if (!isValidUser) {
            return genericErrorResponse(res, AppMessages.INVALID_USER_CREDENTIALS);
        }
        const updatedRes = await authHelper.addAuthTokenInResponseHeader(user, res);
        const data = await authHelper.setUser(user)
        return successResponse(updatedRes, data);
    } catch (error) {
        return internalServerError(res);
    }
};


/**
 * Fetches the list of users and returns them in the response.
 *
 * @param {Object} req - The HTTP request object, though it is not used in this function.
 * @param {Object} res - The HTTP response object, used to return the list of users or an error.
 * @returns {Object} - The response with a success message and the list of users, or an error message in case of failure.
 */
exports.usersList = async (req, res) => {
    try {
      const users = await userService.getUsers();
      if (!isValidDbResponse(users)) {
        return genericErrorResponse(res, AppMessages.APP_RESOURCE_NOT_FOUND);
      }
  
      return successResponse(res, users);
    } catch (error) {
      return internalServerError(res);
    }
  };
