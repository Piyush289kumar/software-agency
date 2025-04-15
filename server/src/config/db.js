import mongoose from "mongoose";
import { logger } from "../utils/logger.js"; // adjust path as needed

export const connectDB = async (app) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info("✅ MongoDB Connected");

    app.listen(process.env.PORT, () => {
      logger.info(`✅ Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    logger.error("❌ DB connection failed: " + error.message);
    process.exit(1);
  }
};
