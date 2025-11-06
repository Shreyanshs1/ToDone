import express from "express";
import { getTodaySummary } from "../controllers/summaryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply 'protect' middleware to all summary routes
router.use(protect);

// @route   GET /api/summary/today
router.get("/today", getTodaySummary);

export default router;