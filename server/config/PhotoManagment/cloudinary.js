const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,

  allowedFormat: ["jpg", "jpeg", "png"],
  params: {
    folder: "barkcode-profile-pictures",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
