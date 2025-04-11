const mongoose = require("mongoose");
mongoose.promise = global.promise;
const dotenv = require("dotenv");

dotenv.config();

const { CLOUD_MONGO_URI } = process.env;

/**
 * connectwithCloudMongoDB
 * -----------------------------------------------------------------
 * This function establishes a connection to a cloud MongoDB database using Mongoose.
 * It returns a Promise that resolves with a success message if the connection is successful,
 * or rejects with an error message if the connection fails.
 *
 * @async
 * @function
 * @returns {Promise<string>} A message indicating whether the cloud database connection was successful or not.
 *
 * Example usage:
 * connectwithCloudMongoDB()
 *   .then(message => console.log(message)) // "cloud database connection successful!"
 *   .catch(error => console.error(error)); // "cloud database connection failed"
 *
 * Note:
 * - Ensure the environment variable `CLOUD_MONGO_URI` is set with the correct MongoDB URI.
 * - Handle the resolved or rejected messages appropriately to inform about the connection status.
 */

// Connecting to the cloud mongodb database
const connectWithCloudMongoDB = () => {
    return new Promise((resolve, reject) => {
        try {
            mongoose.connect(CLOUD_MONGO_URI);
            resolve("Mongo database connection successful!");
        } catch (err) {
            console.log(err);
            reject("Mongo database connection failed");
        }
    });
};

module.exports = { connectWithCloudMongoDB };
