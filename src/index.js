import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./configuration/dbconfig.js";

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 5000;

// Always start the server (works locally and on Vercel)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
