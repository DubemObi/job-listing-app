const express = require("express");
const Job = require("../models/jobModel");
const { handleErrors } = require("../utils/jobErrors");
const QueryMethod = require("../utils/query");

exports.createJob = async (request, response) => {
  try {
    const { title, description, location, jobType, keywords } = request.body;
    const newJob = new Job({ title, description, location, jobType, keywords });
    await newJob.save();
    return response.status(201).send({
      status: true,
      message: "Job has been created",
      data: newJob,
    });
  } catch (err) {
    const error = handleErrors(err);
    response.status(400).json({ error });
  }
};

exports.updateJob = async (request, response) => {
  const id = request.params.id;
  const findJob = await Job.findById(id);
  findJob.title = request.body.title;
  findJob.description = request.body.description;
  findJob.location = request.body.location;
  findJob.jobType = request.body.jobType;
  findJob.keywords = request.body.keywords;
  await findJob.save();
  return response.status(200).send({
    status: true,
    message: "Jobhas been updated successfully",
    data: findJob,
  });
};

exports.getOneJob = async (request, response) => {
  try {
    const id = request.params.id;
    const findOneJob = await Job.findById(id);

    if (!findOneJob) {
      return response.status(404).send({
        status: false,
        message: "Jobnot found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "Jobfound",
        Blog: findOneJob,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
};
// Get jobs based on Location, Keywords
exports.getAllJob = async (req, res) => {
  try {
    let queriedJob = new QueryMethod(Job.find(), req.query)
      .sort()
      .filter()
      .limit()
      .paginate();
    let job = await queriedJob.query;
    res.status(200).json({
      status: "success",
      results: job.length,
      data: job,
    });
  } catch (err) {
    const error = handleErrors(err);
    return response.status(400).json({ error });
  }
};

// Recommend jobs with user skills
exports.recommendJobs = async (req, res) => {
  try {
    const user = req.user;
    let job = await Job.find({ keywords: user.skills });
    res.status(200).json({
      status: "success",
      results: job.length,
      data: job,
    });
  } catch (err) {
    const error = handleErrors(err);
    return response.status(400).json({ error });
  }
};

exports.deleteJob = async (request, response) => {
  const id = request.params.id;
  const findJob = await Job.findByIdAndDelete(id);
  if (findJob) {
    return response.status(200).send({
      status: true,
      message: "Job deleted successfully",
    });
  } else {
    return response.status(409).send({
      status: false,
      message: "Job not found",
    });
  }
};
