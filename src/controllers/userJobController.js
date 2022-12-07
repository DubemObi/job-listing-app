const User = require("../models/userModel");
const Job = require("../models/jobModel");
const UserJob = require("../models/userJobModel");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");

const multerStorage = multer.diskStorage({});

const upload = multer({ storage: multerStorage });

exports.uploadCV = upload.single("cv");

exports.selectCV = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      page: "1-2",
    });
    // console.log(req.file);

    const cvName = result.url;
    req.body.cv = cvName;
    req.body.cloudinary_id = result.public_id;
    next();
  } catch (err) {
    // res.send("An error occured");
    console.log("An error occured", err);
  }
};

exports.applyForJob = async (request, response) => {
  try {
    const { job, cv, cloudinary_id } = request.body;
    const user = request.user;
    // console.log(userID);
    const findJob = await Job.findById(job);
    if (!findJob) {
      return response.status(404).json({ message: "Job is not available" });
    }

    const newUserJob = await UserJob.create({
      user,
      job,
      cv,
      cloudinary_id,
    });

    response.status(201).json({
      status: true,
      mesaage: "Successfully applied for the job",
      data: newUserJob,
    });
  } catch (err) {
    console.log(err);
    response.status(400).json({ message: "Incomplete requirements" });
  }
};

// To update the job status of the user
exports.updateJobStatus = async (request, response) => {
  try {
    const { status } = request.body;
    const userJobID = request.params.id;
    const findUserJob = await UserJob.findById(userJobID);
    const user = request.user;
    if (findUserJob) {
      const newStatus = status;
      const updatedUserJob = await UserJob.findByIdAndUpdate(
        userJobID,
        {
          status: newStatus,
        },
        { new: true }
      );

      response.status(200).json({
        status: true,
        message: "Job status updated successfully",
        data: updatedUserJob,
      });
    } else {
      response.status(401).json({ message: "Job applicatio0n not found" });
    }
  } catch (err) {
    response.status(400).json({ mesaage: "Incomplete requirements" });
  }
};

exports.getUserJob = async (request, response) => {
  try {
    const userJobID = request.params.id;
    const user = request.user;

    const findUserJob = await UserJob.findById({ userJobID });

    if (findUserJob) {
      response.status(200).json({
        status: true,
        message: "User's job application found",
        data: findUserJob,
      });
    } else {
      response.status(200).json({ status: "failed", message: "None found" });
    }
  } catch (err) {
    response.status(400).json({ mesaage: "Incomplete requirements" });
  }
};

exports.getAllUserJob = async (request, response) => {
  try {
    const user = request.user;

    const findUserJob = await UserJob.find({ user: user.id });

    if (findUserJob) {
      response.status(200).json({
        status: true,
        message: "All User's job application found",
        quantity: findUserJob.length,
        data: findUserJob,
      });
    } else {
      response.status(200).json({ status: "failed", message: "None found" });
    }
  } catch (err) {
    response.status(400).json({ mesaage: "Incomplete requirements" });
  }
};
