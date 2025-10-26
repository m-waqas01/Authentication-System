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
// In authRoutes.js
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export default router;
