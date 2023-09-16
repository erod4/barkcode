const db = require("mongoose");
const url =
  "mongodb+srv://erod164:W2xVUZR4DOVSESf8@cluster0.a23uplj.mongodb.net/cafes?retryWrites=true&w=majority&appName=AtlasApp";

db.connect(url)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
//create schema
const markerSchema = new db.Schema(
  {
    name: String,
    address: {
      type: String,
      required: true,
    },
    city: String,
    zipcode: String,
    wifiPassword: String,
    bathroomPassword: String,
    review: Number,
  },
  {
    timestamps: true,
  }
);
//create model
const Marker = db.model("Marker", markerSchema);

module.exports = Marker;
