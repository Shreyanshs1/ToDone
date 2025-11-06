import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import {
  signupValidation,
  loginValidation,
} from "../middleware/authValidation.js";

const router = express.Router();

// Routes with validation in pipeline
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);

export default router;
