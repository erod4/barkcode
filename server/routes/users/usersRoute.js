const express = require("express");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const {
  registerUserController,
  loginUserController,
  getProfileController,
  deleteProfileController,
  updateProfileController,
  resetPasswordController,
  verifyResetController,
} = require("../../cotrollers/users/userController");

const userRoute = express.Router();
//!POST/api/v1/users/register

userRoute.post("/register", registerUserController);

userRoute.post("/login", loginUserController);
userRoute.post("/reset", resetPasswordController);
userRoute.post("/verify-reset", verifyResetController);

userRoute.get("/profile", isLoggedIn, getProfileController);

userRoute.delete("/", isLoggedIn, deleteProfileController);

userRoute.put("/", isLoggedIn, updateProfileController);
module.exports = userRoute;
