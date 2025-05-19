const express = require("express");
const _ = require('lodash');
const User = require("../modals/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { validateSignUp, isAuthenticated, asyncMiddleware } = require("../utils/validation");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();


authRouter.get("/users", isAuthenticated, asyncMiddleware(async (req, res) => {
    const users = await User.find().select({ password: 0, token: 0 })
    res.status(200).send(users);
}));
// authRouter.get("/users", isAuthenticated,async (req, res) => {
//     try {
//     //    const users= await User.find().select('-password') // for excluding properties
//        const users= await User.find().select({password:0,token:0})
//        res.status(200).send(users);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// });

authRouter.post("/signUp", async (req, res) => {
    try {
        validateSignUp(req);
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) return res.status(400).send("User already registered")
        // const newUser = new User({
        //     fullName: req.body.fullName,
        //     email: req.body.email,
        //     password: passwordHash,
        // });
        let newUser = new User(_.pick(req.body, ['fullName', 'email', 'password']));
        newUser.password = await bcrypt.hash(newUser.password, 10);
        await newUser.save();
        res.send(_.pick(newUser, ['_id', 'fullName', 'email']));
    } catch (error) {
        res.status(400).send(error.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPassword = await user.userValidatePassword(password);
        if (isPassword) {
            const token = await user.getJWT();
            res.cookie("Token", token);
            res.status(200).send({
                message: "Login Successfully",
                data: { user: _.pick(user, ['fullName', 'email']), userToken: token },
            });
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

authRouter.post("/forgotPassword", async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Set the reset token and expiration in the database
        user.token = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Construct reset password link
        const resetLink = `${req.protocol}://${req.get(
            "host"
        )}/reset-password/${resetToken}`;

        // Email transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587, // Use 465 for SSL, 587 for TLS
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            // text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 1 hour.`,
            html: `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
        `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            message: "Something went wrong. Please try again later.",
        });
    }
});

authRouter.post("/resetPassword/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Hash the provided token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find the user by the token and check if it hasn't expired
        const user = await User.findOne({
            token: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token." });
        }

        // Update the user's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear reset token and expiration
        user.token = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error });
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("Token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful !!");
});

module.exports = authRouter;
