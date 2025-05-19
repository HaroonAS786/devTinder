const winston = require("winston");
const { connectWithCloudMongoDB } = require("../config/mongodb");
const PORT = process.env.PORT || 8080;

module.exports = function (app) {
    connectWithCloudMongoDB()
        .then((message) => {
            winston.info(message)
            app.listen(PORT, () => {
                console.log("Server is Up and running on port: " + PORT);
            });
        })
        .catch((err) => console.log(err));
}