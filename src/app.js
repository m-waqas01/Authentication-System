import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount routes
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/test-db", (req, res) => {
  res.json({
    dbState:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

export default app;
