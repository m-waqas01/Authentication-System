// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

// backend/src/configuration/dbconfig.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 Attempting to connect to MongoDB...");
    console.log(
      "🧩 Mongo URI:",
      process.env.MONGO_URI ? "Loaded from .env" : "Missing!"
    );

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }

  const dbState = mongoose.connection.readyState;
  console.log("📡 Current DB State Code:", dbState);
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
};

export default connectDB;
