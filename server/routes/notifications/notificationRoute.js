const express = require("express");
const {
  deleteNotificatonController,
} = require("../../cotrollers/notifications/notificationsController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const notificationRoute = express.Router();

notificationRoute.delete("/:id", isLoggedIn, deleteNotificatonController);

module.exports = notificationRoute;
