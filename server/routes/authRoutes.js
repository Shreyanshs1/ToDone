import express from "express";
import { signup, login, logout, getMe } from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../middleware/authValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes with validation in pipeline
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
