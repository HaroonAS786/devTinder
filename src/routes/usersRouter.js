const express = require("express");
const auth = require("../middleware/auth");
// const admin = require("../../middleware/admin");
const userValidator = require("../validators/userValidator");
const usersController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/userList", [auth], usersController.usersList);
// userRouter.get("/getuser/:id", [auth], usersController.getUser);
userRouter.post("/create",[userValidator.validateCreateUser],usersController.createUser);
userRouter.post("/login", userValidator.validateUserLogin, usersController.login);
// userRouter.get("/delete/:id", [auth, admin], usersController.deleteUser);
// userRouter.post("/change_password",[auth, userValidator.validateChangePassword],usersController.changeUserPassword);


module.exports = userRouter;