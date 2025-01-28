const express = require("express");
const { isAuthenticated } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile", isAuthenticated, async (req, res) => {
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

module.exports = profileRouter;
