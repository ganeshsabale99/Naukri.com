const express = require("express");
const authController = require("../controllers/authController");

const userRouter = express.Router();

const multer = require("multer");

// Configure multer to specify the destination and filename for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending a timestamp to the original filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Register a new user
// userRouter.post('/register', authController.register);
userRouter.post(
  "/register",
  upload.single("userImage"),
  authController.register
);

// Login
userRouter.post("/login", authController.login);

module.exports = userRouter;
