const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose
    .connect(url)
    .then(() => {
        console.log("MongoDB Connected.......");
    })
    .catch((error) => {
        console.log("Error while MongoDb connection", error);
    });

