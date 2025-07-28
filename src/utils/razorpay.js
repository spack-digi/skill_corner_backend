const Razorpay = require("razorpay");
const { razorpayKeyId, razorpaySecretKey } = require("../config/envVars");

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecretKey,
});

module.exports = razorpay;
