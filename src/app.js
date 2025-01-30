const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const { connectWithCloudMongoDB } = require("./config/mongodb");

const app = express();

// Load environment variables
require("dotenv").config();

// Database connection (assuming you have this set up)
// require("./config/database");
const PORT = process.env.PORT || 8080;

app.use(parser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

connectWithCloudMongoDB()
    .then((message) => {
        console.log(message);
        app.listen(PORT, () => {
            console.log("Server is Up and running on port: " + PORT);
        });
    })
    .catch((err) => console.log(err));
