const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("../backend/routes/userRoutes");
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.set("strictQuery", false);
const port = process.env.PORT;
const path = require("path");
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
app.use(cors());
app.use("/user", userRoutes);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit();
  }
};
connectDB();
