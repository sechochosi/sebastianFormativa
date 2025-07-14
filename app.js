import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

export default app;
