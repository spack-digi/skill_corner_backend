const nodemailer = require("nodemailer");
const envConfig = require("../config/envVars");


console.log("envConfig", envConfig);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.mail,
    pass: envConfig.mailPassword,
  },
});

function sendMail(mailOptions) {
  return transporter.sendMail({
    from: '"Skill Corner" <skillcorner.edu@gmail.com>',
    ...mailOptions,
  });
}

module.exports = { sendMail };
