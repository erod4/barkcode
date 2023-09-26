const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
dbConnect();
