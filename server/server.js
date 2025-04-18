import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./src/routes/user.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per window
});

app.use(limiter);

// Routes
app.use("/api/users", userRoutes);

// Error Hanlder
app.use(errorHandler);

// Export app for testing
export default app;

// Connect Databased
connectDB(app);
