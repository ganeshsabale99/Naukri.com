const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;


