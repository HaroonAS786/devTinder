const express = require("express");
const { isAuthenticated, validateEditProfile } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", isAuthenticated, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "Token verified",
            user: user,
        });
    } catch (error) {
        console.error("Error verifying token:", error);
    }
});

profileRouter.patch("/profile/edit", isAuthenticated, async (req, res) => {
    try {
        if (!validateEditProfile(req)) {
            throw new Error("Invalid edit request");
        } else {
            const loggedInUser = req.user;
            Object.keys(req.body).forEach(
                (key) => (loggedInUser[key] = req.body[key])
            );
            await loggedInUser.save();
            res.json({
                message: "User updated successfully",
                user: loggedInUser,
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = profileRouter;
