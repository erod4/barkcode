//!!!pointless delete

const upload = require("../../config/PhotoManagment/imgManager");
const Pet = require("../../models/Pet");
const AppErr = require("../../utils/appError");

const addphotoController = async (req, res, next) => {
  try {
    //*get cloudinary url
    const path = req.file.path;

    //*get pet id from req.params
    const id = req.params.id;
    console.log(id);
    //*get pet you want to upload link to

    const pet = await Pet.findByIdAndUpdate(id, { path: path }, { new: true });

    res.json({ status: "success" });
  } catch (error) {
    next(new AppErr("upload failed", 500));
  }
};

const getAllphotosController = async (req, res, next) => {};

const getSinglephotoController = async (req, res, next) => {};

const deleteSinglephotoController = async (req, res, next) => {};
const updateSinglephotoController = async (req, res, next) => {};

module.exports = {
  addphotoController,
  getAllphotosController,
  getSinglephotoController,
  deleteSinglephotoController,
  updateSinglephotoController,
};
