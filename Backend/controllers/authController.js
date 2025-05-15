const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const mongoose = require("mongoose");

const register = async (req, res) => {
  // console.log("req",req.file.filename)
  try {
    const { name, email, password, mobileNumber, description, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with the same email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      description,
      username,

      // userImage: req.file.filename // Store the filename in the userImage field
    });

    const createdUser = await User.create(user);

    // Generate a JWT token
    // const token = jwt.sign(
    //   { user: createdUser.id, role: createdUser.role },
    //   "your-secret-key"
    // );

    res.status(201).send({
      message: "User Registration Successful",
      user: createdUser,
      // token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: error });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found 1" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user: user.id, role: user.role },
      "your-secret-key"
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { register, login };
