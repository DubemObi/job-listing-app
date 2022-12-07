const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name "],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    minlength: [6, "Password is less than 6 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Re-enter your password"],
    select: false,
  },
  skills: {
    type: String,
    enum: [
      "Product-manager",
      "Frontend",
      "Backend",
      "Product-design",
      "Human-resource",
      "Digital-marketing",
    ],
    required: [true, "Please add your skills"],
  },
  experience: {
    type: String,
    enum: ["0-1 year", "2years", "3years", "4years", "5+ years"],
  },
  location: {
    type: String,
    enum: ["Lagos", "Abuja", "Port-harcourt", "Ogun", "Jos"],
    required: [true, "Please enter your location"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = this.password;
  next();
});

module.exports = mongoose.model("user", userSchema);
