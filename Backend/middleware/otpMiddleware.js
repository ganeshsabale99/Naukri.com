const OTP = require("../models/otpModel");

const otpMiddleware = async (req, res, next) => {
  const { otp } = req.body;
  const email = req.body.email; // Assuming you are sending email along with OTP

  try {
    const otpDoc = await OTP.findOne({ otp });

    if (!otpDoc) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    next();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

module.exports = otpMiddleware;
