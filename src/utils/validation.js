const validator = require("validator");

const validateSignUp = (req) => {
    const { fullName, email, password } = req.body;
    if (!fullName) {
        throw new Error("FullName should not be empty");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Your password should be strong");
    }
};

module.exports = {
    validateSignUp,
};
