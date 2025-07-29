require("dotenv").config();

module.exports = {
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpaySecretKey: process.env.RAZORPAY_SECRET_KEY,
  mail: process.env.MAIL,
  mailPassword: process.env.MAIL_PASS,
  adminMail: process.env.ADMIN_MAIL,
};
