const nodemailer = require("nodemailer");

const generateTransporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateMailOptions = (email, resetCode) => {
  return {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetCode}. \nPlease dont share this code with anyone.`,
  };
};

module.exports = { generateTransporter, generateMailOptions };
