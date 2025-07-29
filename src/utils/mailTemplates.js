let userMailTemplate = (name) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Corner Registration</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;">    
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#2E3191;padding:20px;text-align:center;">
              <img src="https://www.aihyderabad.in/_next/static/media/skill%20corner_logo.d6cff9f5.svg" alt="Skill Corner Logo" style="width:156px;height:38px;display:block;margin:0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#F8B314;font-size:20px;font-weight:600;margin:0 0 15px;">Dear ${name},</h2>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">Thank you for registering for the <strong>Prompt Engineering Demo Class</strong> at Skill Corner.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:6px;padding:15px;margin-bottom:15px;">
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Registration Status :</strong> Confirmed</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Amount Paid:</strong> ₹99</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Duration:</strong> 2 Hours Demo Session</td></tr>
              </table>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">We’re excited to have you join us as you take the first step toward mastering AI communication and prompt crafting.</p>
              <h3 style="color:#2E3191;font-size:17px;font-weight:600;margin:15px 0 10px;">Session Details</h3>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">We will be sharing the date and time of your session shortly via email and WhatsApp.</p>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">
                Questions? Reply to this email or call <a href="tel:+917989810225" style="color:#F8B314;text-decoration:none;font-weight:500;">+91 7989810225</a>.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:15px 0;">
                <tr>
                  <td>
                    <a href="http://www.aihyderabad.in" style="background:#f9f9f9;color:#2E3191;text-decoration:none;padding:10px 20px;border-radius:5px;font-size:15px;font-weight:500;display:inline-block;border:1px solid #2E3191;">Visit Website</a>
                  </td>
                </tr>
              </table>
              <p style="color:#333333;font-size:15px;margin:0;">Best regards,</p>
              <p style="color:#333333;font-size:15px;margin:5px 0 0;">
                <strong>Skill Corner Team</strong><br>
                <a href="http://www.aihyderabad.in" style="color:#F8B314;text-decoration:none;">www.aihyderabad.in</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f5f5;padding:15px;text-align:center;font-size:13px;color:#333333;border-top:1px solid #e0e0e0;">
              <p style="margin:0;">&copy; 2025 Skill Corner. All rights reserved.</p>
              <p style="margin:5px 0 0;">
                <a href="http://www.aihyderabad.in" style="color:#2E3191;text-decoration:none;">Website</a> | 
                <a href="mailto:support@aihyderabad.in" style="color:#2E3191;text-decoration:none;">Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

let adminMailTemplate = (name, email, mobile) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Corner Internal Notification</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#2E3191;padding:20px;text-align:center;">
              <img src="https://www.aihyderabad.in/_next/static/media/skill%20corner_logo.d6cff9f5.svg" alt="Skill Corner Logo" style="width:156px;height:38px;display:block;margin:0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#F8B314;font-size:20px;font-weight:600;margin:0 0 15px;">New Registration Alert</h2>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">Hi Team,</p>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">A new student has successfully registered and completed payment for the <strong>Prompt Engineering Demo Class</strong>.</p>
              <h3 style="color:#2E3191;font-size:17px;font-weight:600;margin:15px 0 10px;">Student Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:6px;padding:15px;margin-bottom:15px;">
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Name:</strong> ${name}</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Phone:</strong> ${mobile}</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Email:</strong> ${email}</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Amount Paid:</strong> ₹99</td></tr>
                <tr><td style="padding:5px 0;font-size:15px;color:#333333;"><strong>Course:</strong> Prompt Engineering Demo (2 Hours)</td></tr>
              </table>
              <p style="color:#333333;font-size:15px;margin:0 0 15px;">Please schedule the demo session and update the student with the date and time via email and WhatsApp.</p>
            
              <p style="color:#333333;font-size:15px;margin:0;">Best regards,</p>
              <p style="color:#333333;font-size:15px;margin:5px 0 0;">
                <strong>Spack Solutions</strong><br>
              </p>
            </td>
          </tr>
       
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = {
  userMailTemplate,
  adminMailTemplate,
};
