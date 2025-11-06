import express from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import timeLogRoutes from "./timeLogRoutes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/timelogs", timeLogRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

export default router;
