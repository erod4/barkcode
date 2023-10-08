const { text } = require("express");
const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
    },
    resetCodeExpiration: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    hasCreatedAccount: {
      type: Boolean,
      default: false,
    },
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    alerts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alert",
      },
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
//make fields optional during update

//model
const User = mongoose.model("User", userSchema);

module.exports = User;
