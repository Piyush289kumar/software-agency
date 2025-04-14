import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);

// Error Hanlder
app.use(errorHandler);

// Connect DB and start server
connectDB(app);
