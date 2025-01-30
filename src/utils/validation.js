const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

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

const validateEditProfile = (req) => {
    const allowedFields = [
        "fullName",
        "email",
        "age",
        "photoUrl",
        "gender",
        "imageUrl",
        "about",
        "skills",
    ];
    const isEditAllowed = Object.keys(req.body).every((v) =>
        allowedFields.includes(v)
    );
    return isEditAllowed;
};

const isAuthenticated = async (req, res, next) => {
    try {
        const { Token } = req.cookies;
        if (!Token) {
            return res.status(401).json({ error: "Token not provided" });
        }
        const decodeMessage = await jwt.verify(Token, process.env.SECRET_KEY);
        const { _id } = decodeMessage;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Token is not valid or it is expired " });
    }
};

module.exports = {
    validateSignUp,
    isAuthenticated,
    validateEditProfile
};
