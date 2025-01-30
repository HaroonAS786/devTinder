const express = require("express");
const User = require("../modals/User");
const parser = require("body-parser");
const bcrypt = require("bcrypt");
const { validateSignUp, isAuthenticated } = require("../utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const requestRouter = express.Router();


