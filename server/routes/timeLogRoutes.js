import express from "express";
import {
  startTimer,
  stopTimer,
  getLogsForTask,
  getActiveTimer,
} from "../controllers/timeLogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply 'protect' middleware to all time-log routes
router.use(protect);

// @route   POST /api/timelogs/start
router.post("/start", startTimer);

// @route   PUT /api/timelogs/stop/:id
router.put("/stop/:id", stopTimer);

// @route   GET /api/timelogs/task/:taskId
router.get("/task/:taskId", getLogsForTask);

// @route   GET /api/timelogs/active
router.get("/active", getActiveTimer);

export default router;