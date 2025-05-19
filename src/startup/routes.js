const authRouter = require("../routes/authRouter");
const courseRouter = require("../routes/courseRouter");
const authorRouter = require("../routes/authorRouter");
const rentalRouter = require("../routes/rentalRouter");
const customerRouter = require("../routes/customerRouter");
const movieRouter = require("../routes/movieRouter");
const { errorHandler } = require("../utils/validation");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("../routes/usersRouter");
const dbDebugger = require('debug')('app:db')

module.exports = function (app, express) {

    //---------------------------------
    // Enables Cross-Origin Resource Sharing (CORS), allowing requests from different domains (frontend <-> backend)
    app.use(cors());

    // Parses incoming request bodies in JSON format (for API requests with JSON bodies)
    app.use(parser.json());

    // Also parses JSON payloads; if you're using both `parser.json()` and `express.json()`, one is likely redundant
    app.use(express.json());

    // Parses cookies from the incoming requests, making them accessible via `req.cookies`
    app.use(cookieParser());
    //----------------------------------
    // Sets the view engine to "pug", a template engine used to render HTML on the server side
    app.set('view engine', 'pug');

    // Specifies the directory where the Pug template files are located
    app.set('views', './src/views');
    //----------------------------------
    // Logs incoming HTTP requests in a minimal "tiny" format (useful for debugging and monitoring)
    app.use(morgan('tiny'));

    dbDebugger("Connected to database")
    //----------------------------------
    // app.use("/", courseRouter);
    // app.use("/", authorRouter);
    // app.use("/", rentalRouter);
    // app.use("/", customerRouter);
    // app.use("/", movieRouter);
    // app.use("/", authRouter);
    app.use("/", userRouter);
    //----------------------------------
    app.use(errorHandler)
} 