import express from "express";
import {
  signupUser,
  loginUser,
  verifyToken,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, verifyToken);

export default router;
