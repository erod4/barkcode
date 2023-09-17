const express = require("express");
const router = express.Router();
const {
  createMarkerController,
  getMarkersController,
  delMarkerController,
  updateMarkerController,
} = require("../controller/markerCtr");

//Post Markers
router.post("/", createMarkerController);

//Get all markers
router.get("/", getMarkersController);
//Delete cafe
router.delete("/:id", delMarkerController);
//Update cafe
router.put("/:id", updateMarkerController);

module.exports = router;
