const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

/**
 * Encrypts a given string using bcrypt.
 *
 * @param {string} sourceString - The string to be encrypted.
 * @returns {Promise<string>} - A promise that resolves to the encrypted string.
 *
 * @example
 * const hashedString = await encryptString('myPassword123');
 * console.log(hashedString); // Outputs the encrypted string
 */
exports.encryptString = async (sourceString) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(sourceString, salt);
};


/**
 * Generates a 4-digit one-time password (OTP).
 *
 * @returns {Promise<number>} - A promise that resolves 4 digit random pin.
 *
 * @example
 * const otp = await generateOTP();
 * console.log(otp); // Outputs a 4-digit OTP
 */
exports.generateOTP = async () => {
  return crypto.randomInt(1000, 10000);

};


/**
 * Generates an authentication token using JWT with the provided user data.
 *
 * @param {Object} data - The user data object.
 * @param {string} data.id - The user ID.
 * @param {string} data.role - The user role.
 * @param {string} data.email - The user email.
 * @returns {Promise<string>} - A promise that resolves to the generated JWT token.
 *
 * @example
 * const token = await generateAuthTokenWithObject({ id: '123', role: 'admin', email: 'user@example.com' });
 * console.log(token); // Outputs the JWT token
 */


exports.generateAuthTokenWithObject = async (data) => {
  return jwt.sign(
    {
      _id: data._id,
      // role: data.role,
      email: data.email,
    },
    process.env.SECRET_KEY
  );
};


/**
 * Adds an authentication token to the response header.
 *
 * @param {Object} data - The user data object.
 * @param {Object} resObject - The response object.
 * @param {string} data.id - The user ID.
 * @param {string} data.role - The user role.
 * @param {string} data.email - The user email.
 * @returns {Promise<Object>} - A promise that resolves to the updated response object.
 *
 * @example
 * const res = await addAuthTokenInResponseHeader({ id: '123', role: 'admin', email: 'user@example.com' }, res);
 * console.log(res); // Outputs the response object with the added "x-auth-token" header
 */
exports.addAuthTokenInResponseHeader = async (data, resObject) => {
  let token = await this.generateAuthTokenWithObject(data);
  data.token = token;
  // Set token in cookie
  // resObject.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.SECRET_KEY === "DEV_TINDER@786",
  // });

  // ✅ Set token in custom header
  resObject.header("x-auth-token", token);
  return resObject;
};

/**
 * Validates if the provided password matches the encrypted password.
 *
 * @param {string} requestPassword - The password provided by the user.
 * @param {string} encryptedPassword - The encrypted password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the password is valid.
 *
 * @example
 * const isValid = await isValidUser('userPassword', 'encryptedPasswordFromDB');
 * console.log(isValid); // Outputs true or false
 */
exports.isValidUser = async (requestPassword, encryptedPassword, responseObject) => {
  return bcrypt.compare(requestPassword, encryptedPassword);
};

exports.setUser = async (data) => {
  const result = data;
  result.password = undefined
  return result
}
