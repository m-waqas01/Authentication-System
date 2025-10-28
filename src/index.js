// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./configuration/dbconfig.js";

// dotenv.config();
// await connectDB();

// const PORT = process.env.PORT || 5000;

// // Always start the server (works locally and on Vercel)
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// export default app;

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./configuration/dbconfig.js";

dotenv.config();

// Wrap in async function
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
