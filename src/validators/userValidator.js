const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateCreateUser = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateChangePassword = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    id: Joi.string().required(),
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required(),
  });
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateUserLogin = async (req, res, next) => {
  let { body } = req;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};
