const jwt = require("jsonwebtoken");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

function auth(req, res, next) {
  // const token = req.header("x-auth-token"); 
  const token =  req.cookies.token;
  // const authHeader = req.headers.authorization; 

  // const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(HttpCodes.FORBIDDEN).send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (ex) {
    return res.status(HttpCodes.FORBIDDEN).send(new ErrorResponse(AppMessages.APP_ACCESS_DENIED));
  }
}

module.exports = auth;
