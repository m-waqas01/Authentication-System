import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ MERN Auth Backend is Running!");
});

app.get("/test-db", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    dbState: states[dbState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

export default app;
