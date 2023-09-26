const mongoose = require("mongoose");
//notification schema
const qrSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      required: true,
    },
    clickCount: {
      type: Number,
      required: true,
      default: 0,
    },
    data: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
const Qr = mongoose.model("QrCode", qrSchema);
module.exports = Qr;
