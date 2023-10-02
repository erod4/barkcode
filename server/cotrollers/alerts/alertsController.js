const Alert = require("../../models/Alert");
const User = require("../../models/UserM");
const AppErr = require("../../utils/appError");

const addAlertController = async (req, res, next) => {
  const { title, body, city } = req.body;

  try {
    //*create alert to display to the public
    const alert = await Alert.create({
      title,
      body,
      city,
      createdBy: req.user,
    });
    //*push alert to all users
    //get all users
    const usersFound = await User.find();
    //check if users exist
    if (!usersFound) {
      return next(new AppErr("Users not found", 404));
    }
    //push alert to individual user
    for (const user of usersFound) {
      user.alerts.push(alert.id);
      await user.save();
    }

    res.json({ status: "success", data: alert });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const getAllAlertsController = async (req, res, next) => {
  try {
    //*get all alerts

    const alerts = await Alert.find();

    res.json({ status: "success", alerts });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const getSingleAlertController = async (req, res, next) => {
  try {
    //*get id for alert you want
    const { id } = req.params;
    //*find alert by id
    const alert = await Alert.findById(id);
    //*return alert
    res.json({ status: "success", alert });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const deleteAlertController = async (req, res, next) => {
  try {
    //*get id for alert you want to delete
    const { id } = req.params;
    //*look to see if person deleting it is the one who made it
    const createdBy = req.user;

    const isCreatedBy = await Alert.findOne({ _id: id, createdBy });

    //*look up alert by id
    if (!isCreatedBy) {
      return next(new AppErr("not creator", 404));
    }

    await Alert.findByIdAndDelete(id);

    //*loop through all users to delete alert
    const usersFound = await User.find();
    //push alert to individual user
    for (const user of usersFound) {
      user.alerts.pull(id);
      await user.save();
    }

    res.json({ status: "success" });
  } catch (error) {
    next(new AppErr(error, 400));
  }
};
const updateAlertController = async (req, res) => {
  //*get alert id from params
  const { id } = req.params;
  try {
    //get alert that matches id and update using req.body properties
    const alert = await Alert.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    //return alert
    res.json({ message: "success", alert });
  } catch (error) {
    next(new AppErr(error.message, 400));
  }
};

module.exports = {
  addAlertController,
  getAllAlertsController,
  getSingleAlertController,
  deleteAlertController,
  updateAlertController,
};
