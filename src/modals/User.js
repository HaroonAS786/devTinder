const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 4,
        },
        email: {
            type: String,
            maxLength: 100,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(val) {
                if (!validator.isEmail(val)) {
                    throw new Error("Invalid Email Address: " + val);
                }
            },
        },
        age: {
            type: Number,
            maxLength: 100,
            minLength: 1,
        },
        gender: {
            type: String,
            lowercase: true,
            validate(val) {
                if (!["male", "female", "others"].includes(val)) {
                    throw new Error("Gender is not valid");
                }
            },
        },
        imageUrl: {
            type: String,
            default:
                "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
            validate(val) {
                if (!validator.isURL(val)) {
                    throw new Error("Invalid Url: " + val);
                }
            },
        },
        about: {
            type: String,
            default: "Hi, welcome to the Tinder App",
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
            validate(val) {
                if (!validator.isStrongPassword(val)) {
                    throw new Error("Your password should strong " + val);
                }
            },
        },
        skills: {
            type: [String],
        },

        token: {
            type: String,
            default: "",
        },

        resetPasswordExpires: {
            type: Date, // Store the expiration time
        },
       
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // } ,
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60*60,
    });
    return token;
};

UserSchema.methods.userValidatePassword = async function (passwordInput) {
    const user = this;
    const isPasswordValidate = await bcrypt.compare(
        passwordInput,
        user.password
    );
    return isPasswordValidate;
};


const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
