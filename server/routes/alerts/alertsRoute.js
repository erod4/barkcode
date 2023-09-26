const express = require("express");
const alertRoute = express.Router();
const {
  addAlertController,
  getAllAlertsController,
  getSingleAlertController,
  deleteAlertController,
  updateAlertController,
} = require("../../cotrollers/alerts/alertsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");

alertRoute.post("/", isLoggedIn, addAlertController);

alertRoute.get("/", isLoggedIn, getAllAlertsController);

alertRoute.get("/:id", isLoggedIn, getSingleAlertController);

alertRoute.delete("/:id", isLoggedIn, deleteAlertController);

alertRoute.put("/:id", isLoggedIn, updateAlertController);

module.exports = alertRoute;
