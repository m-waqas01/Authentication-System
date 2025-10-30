import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:3000",
  "https://waqas-auth-frontend.vercel.app",
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  console.log(`[CORS] ${req.method} ${req.path} from origin: ${origin}`);

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    console.log("[CORS] Handling OPTIONS preflight");
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);

// Test DB connection route
app.get("/test-db", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    dbState: states[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

// CORS test endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({
    message: "CORS test successful!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/", (req, res) => res.send(" MERN Auth Backend Running"));

//  Wrap DB connect and server start in async function
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected:", mongoose.connection.host);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` CORS enabled for: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    console.error(" Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
