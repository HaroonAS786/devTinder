const express = require("express");

const app = express();

app.get("/test", (req, res) => {
    res.send("Get Request");
});
app.post("/test", (req, res) => {
    res.send("Post Request");
});
app.put("/test", (req, res) => {
    res.send("Put Request");
});
app.delete("/test", (req, res) => {
    res.send("Delete Request");
});

// app.use("/test", (req, res) => {
//     res.send("Hello Testing device");
// });

app.listen(2000, () => {
    console.log("Server is successfully running");
});
