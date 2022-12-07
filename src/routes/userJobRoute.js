const express = require("express");
const UserJobController = require("../controllers/userJobController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

app.use(express.json());
const router = express.Router();

const {
  applyForJob,
  updateJobStatus,
  getUserJob,
  getAllUserJob,
  uploadCV,
  selectCV,
} = UserJobController;
router
  .route("/")
  .post(auth, uploadCV, selectCV, applyForJob)
  .get(auth, getAllUserJob);

router
  .route("/:id")
  .get(auth, getUserJob)
  .put(auth, checkUser("admin"), updateJobStatus);

module.exports = router;
