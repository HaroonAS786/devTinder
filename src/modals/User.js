const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        lowercase:true,
        validate(val) {
            if (!["male", "female", "others"].includes(val)) {
                throw new Error("Gender is not valid");
            }
        },
    },
    imageUrl: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "Hi, welcome to the Tinder App",
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
