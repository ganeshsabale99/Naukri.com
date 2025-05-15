const express = require("express");
const router = express.Router();
const OTP = require("../models/otpModel");
const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Import the OTP middleware
const otpMiddleware = require("../middleware/otpMiddleware");

router.post("/send-otp", async(req, res) => {
  const { email, name } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your One-Time Password (OTP) for Naukri Registration",
    text: `Dear ${name},\n\n` +
    `Thank you for choosing Naukri, India's leading job portal. To complete your registration, please use the following One-Time Password (OTP):\n\n` +
    `Your OTP for verification is: ${otp}\n\n` +
    `Please enter this OTP on the registration page to verify your email address and proceed with creating your Naukri account. This OTP is valid for the next 5 minutes.\n\n` +
    `If you did not request this OTP, please ignore this email.\n\n` +
    `Happy job hunting!\n\n` +
    `Best regards,\n` +
    `Ganesh Sabale\n` +
    `(The Naukri Team)`,
    
  };

  try {
    // Save OTP to the database
    await OTP.create({ email, otp });

    // Send OTP via email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send OTP" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ success: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error saving OTP to database:", error);
    res.status(500).json({ error: "Failed to save OTP" });
  }
});

router.post("/verify-otp", otpMiddleware, (req, res) => {
    res.status(200).json({ success: "OTP verified successfully" });
  });

module.exports = router;
