const Pet = require("../../models/Pet");
const User = require("../../models/UserM");
const AppErr = require("../../utils/appError");
const Notification = require("../../models/Notification");
const client = require("../../config/Google Maps/geoCode");
const addPetController = async (req, res, next) => {
  const { name, breed, dob, description, qrURL, phone, email } = req.body;
  try {
    console.log(qrURL);
    //get code from url
    console.log(req.file);
    const path = req.file.path;
    const code = qrURL.split("/")[qrURL.split("/").length - 1];
    console.log(code);
    //Find the logged in user
    const userFound = await User.findById(req.user);

    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }
    //Create the pet
    const pet = await Pet.create({
      name,
      breed,
      dob,
      description,
      createdBy: req.user,
      hasCreatedAccount: true,
      qrURL,
      code: code,
      path: path,
      phone,
      email,
    });
    //Push pet to the user
    userFound.pets.push(pet.id);
    //Resave user
    await userFound.save();
    res.json({ status: "success", data: pet });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};

const getAllPetsController = async (req, res, next) => {
  try {
    const pets = await Pet.find();
    res.status(200).json({
      status: "success",
      data: pets,
    });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};

const getSinglePetController = async (req, res, next) => {
  try {
    const { id } = req.params;
    let message;
    const { latitude, longitude } = req.query;
    //reverse geo

    if (latitude !== "null" && longitude !== "null") {
      const res = await client.reverseGeocode({
        params: {
          latlng: `${latitude},${longitude}`,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });
      const address = res.data.results[0].formatted_address;
      message = `QR Code Was Scanned at ${address}.`;
    } else {
      message = `QR Code Was Scanned But No Location Was Provided`;
    }
    const pet = await Pet.findOne({ code: id });
    // console.log(pet);
    const hasPet = await User.findOne({ pets: pet.id });
    const notif = await Notification.create({
      type: "QR Scan",
      title: ` QR Code Scanned (${pet.name})`,
      message,
      userId: hasPet.id,
    });

    hasPet.notifications.push(notif.id);
    await hasPet.save();

    res.status(200).json({
      status: "success",
      data: pet,
    });
  } catch (error) {
    next(new AppErr(error, 400));
    console.log(error);
  }
};

const deleteSinglePetController = async (req, res, next) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const pets = await Pet.findByIdAndDelete(id);
    const user = await User.findById(userId);
    await user.pets.pull(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const updateSinglePetController = async (req, res, next) => {
  try {
    //* get id from params
    const { id } = req.params;
    //*find pet in db by id and update with req.body properties
    const pets = await Pet.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: pets,
    });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};

module.exports = {
  addPetController,
  getAllPetsController,
  getSinglePetController,
  deleteSinglePetController,
  updateSinglePetController,
};
