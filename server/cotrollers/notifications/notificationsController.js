const Notification = require("../../models/Notification");
const User = require("../../models/UserM");
const AppErr = require("../../utils/appError");

const deleteNotificatonController = async (req, res, next) => {
  //*get id from params/url
  const { id } = req.params;
  //*get user from request
  const userId = req.user;
  const user = await User.findById(userId);
  //*find notif in users and delete
  await user.notifications.pull(id);
  await user.save();
  //*delete id
  await Notification.findByIdAndDelete(id);
  //*send response back
  res.json({ message: "success" });
  try {
  } catch (error) {
    next(new AppErr(error, 400));
  }
};

//!will have to add controller to delete notifications from notifications

module.exports = {
  deleteNotificatonController,
};
