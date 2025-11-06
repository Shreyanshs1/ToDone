import express from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import timeLogRoutes from "./timeLogRoutes.js";
import summaryRoutes from "./summaryRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/timelogs", timeLogRoutes);
router.use("/summary", summaryRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

export default router;
