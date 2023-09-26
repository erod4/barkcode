//!!!pointless delete
const express = require("express");
const {
  addphotoController,
  getAllphotosController,
  getSinglephotoController,
  deleteSinglephotoController,
  updateSinglephotoController,
} = require("../../cotrollers/images/imgsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const upload = require("../../config/PhotoManagment/imgManager");

const photoRoute = express.Router();

photoRoute.post("/:id", upload.single("file"), addphotoController);

photoRoute.delete("/:id", isLoggedIn, deleteSinglephotoController);

photoRoute.put("/:id", isLoggedIn, updateSinglephotoController);
module.exports = photoRoute;
