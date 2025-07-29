const nodemailer = require("nodemailer");
const envConfig = require("../config/envVars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.mail,
    pass: envConfig.mailPassword,
  },
});

function sendMail(mailOptions) {
  return transporter.sendMail({
    from: process.env.GMAIL_USER,
    ...mailOptions,
  });
}

module.exports = { sendMail };
