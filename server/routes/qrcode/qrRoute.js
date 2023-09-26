const express = require("express");
const {
  addQrCodeController,
  getAllQrCodeController,
  getSingleQrCodeController,
  deleteQrCodeController,
  updateQrCodeController,
} = require("../../cotrollers/qrcode/qrController");

const qrCodeRoute = express.Router();
//!POST/api/v1/qrCodes/
qrCodeRoute.post("/", addQrCodeController);
//!GET/api/v1/qrCodes/
qrCodeRoute.get("/", getAllQrCodeController);
//!GET/api/v1/qrCodes/:id
qrCodeRoute.get("/qr/:id", getSingleQrCodeController);
//!DELETE/api/v1/qrCodes/:id
qrCodeRoute.delete("/qr/:id", deleteQrCodeController);
//!PUT/api/v1/qrCodes/:id
qrCodeRoute.put("/qr/:id", updateQrCodeController);
module.exports = qrCodeRoute;
