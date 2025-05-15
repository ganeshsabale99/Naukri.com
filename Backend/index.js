const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const connectDB = require("./config/databaseConfig");
const userRouter = require("./routes/authRoutes");

const otpRoutes = require("./routes/otpRoutes");
// const otpMiddleware = require("./middleware/otpMiddleware");

require("dotenv").config();

const cors = require("cors");

const app = express();
const port = process.env.PORT || 8081;

app.use("/api", express.static("public/uploads"));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", userRouter);
app.use("/api", userRoutes);

// app.use("/api/otp", otpMiddleware);
app.use("/api/otp", otpRoutes);


app.listen(port, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
