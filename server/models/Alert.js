const mongoose = require("mongoose");

//alert schema
const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now(),
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;
