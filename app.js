const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoute");
const job = require("./src/routes/jobRoutes");
const userJobRoutes = require("./src/routes/userJobRoute");
const { config } = require("dotenv");

const app = express();
app.use(express.json());
app.use(cookieParser());

const accessLogStream = fs.createWriteStream(
  path.join("./src/utils", "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/jobs", job);
app.use("/api/v1/user-job", userJobRoutes);
app.use("/api/v1/user", userRoutes);
module.exports = app;
