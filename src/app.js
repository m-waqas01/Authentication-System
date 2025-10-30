import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Basic middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Basic routes
app.get("/", (req, res) => {
  res.send(" MERN Auth Backend is Running on Vercel!");
});

app.get("/test-db", (req, res) => {
  // This will be handled by index.js where mongoose is connected
  res.json({
    message: "DB test route - check index.js for mongoose connection",
    timestamp: new Date().toISOString(),
  });
});

// Export the app without starting server
export default app;
