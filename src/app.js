import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Comprehensive CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://waqas-auth-frontend.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight requests manually
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ MERN Auth Backend is Running on Vercel!");
});

// ✅ Database check route
app.get("/test-db", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    dbState: states[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

export default app;
