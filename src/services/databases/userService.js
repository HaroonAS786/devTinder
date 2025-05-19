const UserModal = require("../../modals/User");
const User = require("../../modals/User");

/**
 * Authenticates a user by fetching their record from the database using their email and password.
 *
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 *
 * @returns {User|null} The user object if the login is successful, null otherwise.
 * @throws Will throw an error if the database query fails.
 * 
 */
exports.login = async (email, password) => {
  // Fetch user by email and password
  const user = await this.getUser(email, password);
  return user;
};

exports.getUser = async (email, password) => {
  try {
    const resp = await User.findOne({ email: email });
    return resp
  } catch (error) {
    return error;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const resp = await User.find({ email: email });
    return resp
  } catch (error) {
    return error;
  }
};


exports.createUserAccount = async (fullName, email, password,) => {
  try {
    const newUser = new User({ fullName: fullName, email: email, password: password });
    await newUser.save();
    return newUser;
  } catch (err) {
    return err;
  }
};

exports.getUsers = async () => {
  try {
    const resp = await UserModal.find().select({password:0,token:0})
    return resp;
  } catch (err) {
    return err;
  }
};