const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {
  registerUserController,
  loginUserController,
  getProfileController,
  deleteProfileController,
  updateProfileController,
} = require("../../cotrollers/users/userController");

const userRoute = express.Router();
//!POST/api/v1/users/register

userRoute.post("/register", registerUserController);

userRoute.post("/login", loginUserController);

userRoute.get("/profile", isLoggedIn, getProfileController);

userRoute.delete("/", isLoggedIn, deleteProfileController);

userRoute.put("/", isLoggedIn, updateProfileController);
module.exports = userRoute;
