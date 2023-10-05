const bcrypt = require("bcrypt");
const User = require("../../models/UserM");
const AppErr = require("../../utils/appError");
const generateToken = require("../../utils/generateToken");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const registerUserController = async (req, res, next) => {
  const { firstname, lastname, password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User Already Exists"), 400);
    }

    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      hasCreatedAccount: true,
    });

    res.json({
      status: "success",
      firstname: user.firstname,
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    return next(new Error(error));
  }
};
const loginUserController = async (req, res, next) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    //check for password validity
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    res.json({
      status: "success",
      firstname: userFound.firstname,
      id: userFound.id,
      token: generateToken(userFound.id),
    });
  } catch (error) {
    console.log(error);
    next(new AppErr(error.message, 500));
  }
};
const getProfileController = async (req, res, next) => {
  try {
    const id = req.user;
    const user = await User.findById(id)
      .populate({
        path: "pets",
        model: "Pet",
      })
      .populate({
        path: "alerts",
        model: "Alert",
      })
      .populate({
        path: "notifications",
        model: "Notification",
      });

    res.json(user);
  } catch (error) {
    next(new AppErr(error.message, 500));
    console.log(error.message);
  }
};
const deleteProfileController = async (req, res, next) => {
  try {
 
    //*find user by id
    const deletedUser=await User.findByIdAndDelete(req.user);


    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};
const updateProfileController = async (req, res, next) => {
  try {
    const { firstname, lastname, password } = req.body;
    const email = req.body.email.toLowerCase();
    console.log(req.body);
    //*check if email exists
    if (req.body.email) {
      const userFound = await User.findOne({ email });
      if (userFound) {
        return next(new AppErr("Email Already In Use", 400));
      } else {
        await User.findByIdAndUpdate(
          req.user,
          { email },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    }
    if (req.body.firstname) {
      const user = await User.findByIdAndUpdate(
        req.user,
        { firstname },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    if (req.body.lastname) {
      console.log("got here");
      const user = await User.findByIdAndUpdate(
        req.user,
        { lastname },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    //*check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //*update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(200).json({
      status: "success",
    });
    //update other fields
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  getProfileController,
  deleteProfileController,
  updateProfileController,
};
