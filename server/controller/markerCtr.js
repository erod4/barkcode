const Marker = require("../utils/db");
//Post Markers
const createMarkerController = async (req, res) => {
  //   const { name, address, city, zipcode, wifiPassword, bathroomPassword } =
  //     req.body;

  //   const addressFound = await Marker.findOne({ address });
  //   if (!addressFound) {
  //     Marker.create({
  //       name,
  //       address,
  //       city,
  //       zipcode,
  //       wifiPassword,
  //       bathroomPassword,
  //     })
  //       .then((marker) => {
  //         res.redirect("/");
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     console.log("already in db");
  //   }
  res.json("Testing Post Route");
};
const getMarkersController = async (req, res) => {
  const markers = await Marker.find();
  console.log(markers);
  //res.render("index", { markers });
  res.json("Testing Get Route");
};
//Delete cafe
const delMarkerController = async (req, res) => {
  //   const id=req.body.id;
  //   const marker = await Marker.findByIdAndDelete({ id });
  res.json("Testing Delete Route");
};
//Update cafe
const updateMarkerController = async (req, res) => {
  const { id, wifiPassword, bathroomPassword } = req.body;
  const marker = await Marker.findByIdAndUpdate(
    id,
    {
      //these are the field you want to be able to update but it doesnt mean updating only one results in the other being empty
      wifiPassword,
      bathroomPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json("Testing Put Route");
};

module.exports = {
  createMarkerController,
  getMarkersController,
  delMarkerController,
  updateMarkerController,
};
