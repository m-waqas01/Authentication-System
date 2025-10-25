import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./configuration/dbconfig.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
