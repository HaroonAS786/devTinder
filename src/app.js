const express = require("express");
const parser = require("body-parser");
const User = require("./modals/User");
const bcrypt = require("bcrypt");
const { validateSignUp } = require("./utils/validation");

const app = express();

// Load environment variables
require("dotenv").config();

// Database connection (assuming you have this set up)
require("./config/database");
const PORT = process.env.PORT || 8080;

app.use(parser.json());
app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error", data: error });
    }
});

app.post("/signUp", async (req, res) => {
    try {
        validateSignUp(req);
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
        });
        await user.save();
        res.send("User has been Added");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {
            res.status(200).send("Login Successfully");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.patch("/updateUser/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const allowedUpdates = ["fullName", "email", "gender", "age", "skills"];
        const isAllowed = Object.keys(data).every((k) =>
            allowedUpdates.includes(k)
        );
        if (!isAllowed) {
            res.status(400).send("Update not allowed");
        } else {
            const user = await User.findByIdAndUpdate({ _id: userId }, data, {
                returnDocument: "after",
                runValidators: true,
            });
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log("Server is Up and running on port: " + PORT);
});
