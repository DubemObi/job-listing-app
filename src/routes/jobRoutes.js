const express = require("express");
const JobController = require("../controllers/jobController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

const router = express.Router();

const { createJob, updateJob, getAllJob, getOneJob, deleteJob, recommendJobs } =
  JobController;
router
  .route("/")
  .post(auth, /*checkUser("admin"),*/ createJob)
  .get(auth, getAllJob);

router.get("/recommend-jobs", auth, recommendJobs);
router.delete("/:id", auth, checkUser("admin"), deleteJob);

router.get("/:id", auth, getOneJob);

router.put("/:id", auth, checkUser("admin"), updateJob);
module.exports = router;
