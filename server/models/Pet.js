const mongoose = require("mongoose");

//pet schema

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      required: true,
    },
    code: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: String,
    phone: String,
    hasCreatedAccount: {
      type: Boolean,
      default: false,
    },
    qrURL: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: " ",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//model
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
