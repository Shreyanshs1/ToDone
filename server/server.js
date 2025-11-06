import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
