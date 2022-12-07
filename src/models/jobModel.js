const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the job title"],
  },
  description: {
    type: String,
    required: [true, "Please enter job description"],
  },
  location: {
    type: String,
    enum: ["Lagos", "Abuja", "Port-harcourt", "Ogun", "Jos"],
    required: [true, "Please enter the job location"],
  },
  jobType: {
    type: String,
    required: [true, "Please enter job type"],
  },
  keywords: {
    type: String,
    enum: [
      "Product-manager",
      "Frontend",
      "Backend",
      "Product-design",
      "Human-resource",
      "Digital-marketing",
    ],
    required: [true, "Please enter keywords"],
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
