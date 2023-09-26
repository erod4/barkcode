const express = require("express");
const {
  addPetController,
  getAllPetsController,
  getSinglePetController,
  deleteSinglePetController,
  updateSinglePetController,
} = require("../../cotrollers/pets/petsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const upload = require("../../config/PhotoManagment/imgManager");
const petRoute = express.Router();

petRoute.post("/", upload.single("file"), isLoggedIn, addPetController);

petRoute.get("/", isLoggedIn, getAllPetsController);

petRoute.get("/:id", getSinglePetController);

petRoute.delete("/:id", isLoggedIn, deleteSinglePetController);

petRoute.put("/:id", isLoggedIn, updateSinglePetController);
module.exports = petRoute;
