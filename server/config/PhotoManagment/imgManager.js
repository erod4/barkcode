const storage = require("./cloudinary");
const multer = require("multer");
const upload = multer({ storage: storage });
//config multer
module.exports = upload;
