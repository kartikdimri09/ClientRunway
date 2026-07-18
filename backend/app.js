import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import clientRoutes from "./src/routes/clientRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "ClientRunway API is running",
  });
});

export default app;