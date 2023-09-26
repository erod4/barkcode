const qr = require("qrcode");
const Qr = require("../../models/QRCode");
const shortid = require("shortid");
const Pet = require("../../models/Pet");
const AppErr = require("../../utils/appError");
const addQrCodeController = async (req, res) => {
  const uniqueId = shortid.generate();
  //generate pet profile url with unique id, we will have to reassign pet with this id
  const url = `http://192.168.0.3:3000/pet-profile/${uniqueId}`;
  console.log(url);
  const options = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1.2,
    color: {
      dark: "#EC9316",
      light: "#FFFF",
    },
    width: 250,
  };
  qr.toDataURL(url, options, async (err, src) => {
    if (err) {
      console.log(err);
    }
    try {
      const qrcode = await Qr.create({
        uniqueId,
        data: src,
      });
      res.json({ qrcode });
    } catch (error) {
      console.log(error);
    }
  });
};
const getAllQrCodeController = async (req, res) => {
  try {
    res.json({ msg: "Get All QrCode Route" });
  } catch (error) {
    console.log(error);
  }
};
const getSingleQrCodeController = async (req, res, next) => {
  try {
    //*look in the params for the req.uniqueId
    const { id } = req.params;

    //*search for qr code in the pets
    const petProfile = await Pet.findOne({ QRcode: id });

    //*get petprofile url and send it back
    const url = petProfile.profileURL;
    res.json({ status: "success", data: url });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const deleteQrCodeController = async (req, res, next) => {
  try {
    res.json({ msg: "Delete Single QrCode Route" });
  } catch (error) {
    console.log(error);
  }
};
const updateQrCodeController = async (req, res, next) => {
  try {
    //* pet id is sent from req.params
    const { id } = req.params;
    console.log(id);
    //*scan qr code, qr code uniqueId gets sent through req.body
    const { uniqueId } = req.body;
    console.log(uniqueId);
    //* look for pet and radd qr code to pet
    const pet = await Pet.findById(id);
    console.log(pet);
    //* push unique id into pet qr codes
    pet.QRcode.push(uniqueId);
    //*save pets
    await pet.save();
    console.log(pet);
    res.json({ status: "success" });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};

module.exports = {
  addQrCodeController,
  getAllQrCodeController,
  getSingleQrCodeController,
  deleteQrCodeController,
  updateQrCodeController,
};
