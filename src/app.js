const Joi = require("joi");
Joi.objectId=require("joi-objectid")(Joi)
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const { connectWithCloudMongoDB } = require("./config/mongodb");
const courseRouter = require("./routes/courseRouter");
const vidlyRouter = require("./routes/vidlyRouter");
const morgan = require("morgan");
const CourseModal = require("./modals/Courses");
const authorRouter = require("./routes/authorRouter");
const rentalRouter = require("./routes/rentalRouter");
const customerRouter = require("./routes/customerRouter");
const movieRouter = require("./routes/movieRouter");
const debug = require("debug")('app:startup');
const dbDebugger=require('debug')('app:db')

const app = express();

// Load environment variables
require("dotenv").config();

// Database connection (assuming you have this set up)
// require("./config/database");
const PORT = process.env.PORT || 8080;

app.use(parser.json());
app.use(express.json());
app.use(cookieParser());

app.set('view engine','pug')
app.set('views','./src/views')


// app.use("/", profileRouter);

if(app.get('env')==='development'){
  app.use(morgan('tiny'))
  dbDebugger("Connected to database")
  app.use("/", courseRouter);
  app.use("/", authorRouter);
  app.use("/", rentalRouter);
  app.use("/", customerRouter);
  app.use("/", movieRouter);
//   app.use("/", vidlyRouter);
}


connectWithCloudMongoDB()
    .then((message) => {
        console.log(message);
        app.listen(PORT, () => {
            console.log("Server is Up and running on port: " + PORT);
        });
    })
    .catch((err) => console.log(err));
