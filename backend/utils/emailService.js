const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email skipped: EMAIL_USER or EMAIL_PASS is not configured.');
    return null;
  }

  // Create transporter
  const transportConfig = {
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  if (process.env.EMAIL_HOST) {
    transportConfig.host = process.env.EMAIL_HOST;
    transportConfig.port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;
    transportConfig.secure = String(transportConfig.port) === '465';
  } else {
    transportConfig.service = process.env.EMAIL_SERVICE || 'gmail';
  }

  const transporter = nodemailer.createTransport(transportConfig);

  // Define email options
  const mailOptions = {
    from: `"Synditech" <${process.env.EMAIL_USER}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log('Email sent: %s accepted=%j rejected=%j response=%s', info.messageId, info.accepted, info.rejected, info.response);
  return info;
};

module.exports = sendEmail;
