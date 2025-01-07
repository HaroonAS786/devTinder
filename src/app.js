const express = require("express");
const parser = require("body-parser");
const User = require("./modals/User");

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
        const user = new User({ ...req.body });
        await user.save();
        res.send("User has been Added");
    } catch (error) {
        res.status(400).send(error.message);
    }
});




app.listen(PORT, () => {
    console.log("Server is Up and running on port: " + PORT);
});
