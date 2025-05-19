
const express = require("express");
const { joiValidation } = require("./utils/validation");
const app = express();
joiValidation()

// Load environment variables
require("dotenv").config();
// Load routes
require('./startup/routes')(app,express)
// DB initialization & server 
require('./startup/dbInitialization')(app)
// handling exceptions
require('./startup/exceptions')()


