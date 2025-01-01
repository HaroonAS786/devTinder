const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello Testing device");
});

app.listen(2000, () => {
    console.log("Server is successfully running");
});
