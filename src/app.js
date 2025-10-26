// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("✅ MERN Auth Backend is Running!");
// });

// export default app;

// backend/src/app.js
import express from "express";
import connectDB from "./configuration/dbconfig.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// ✅ Mount routes
app.use("/api/auth", authRoutes);

// ✅ Test Route to Check DB Status
import mongoose from "mongoose";
app.get("/test-db", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    dbState: states[dbState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

export default app;
