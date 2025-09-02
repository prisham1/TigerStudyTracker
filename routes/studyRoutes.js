const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  addStudyLog,
  getUserStudyLogs,
  deleteStudyLog,
  downloadLogs
} = require("../controllers/studyController");

const router = express.Router();

// With this study log data we can create maps, ML recommendations
// Routes to retrieve all this data
router.post("/add", protect, addStudyLog);
router.get("/get", protect, getUserStudyLogs);
router.delete("/:id", protect, deleteStudyLog);
router.get("/download", protect, downloadLogs);

module.exports = router;
