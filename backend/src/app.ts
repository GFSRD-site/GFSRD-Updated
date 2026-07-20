import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { adminAuthRoutes } from "./routes/adminAuthRoutes";
import { adminContactRoutes } from "./routes/adminContactRoutes";
import { adminInternshipRoutes } from "./routes/adminInternshipRoutes";
import { adminNewsletterRoutes } from "./routes/adminNewsletterRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { publicContactRoutes } from "./routes/publicContactRoutes";
import { publicInternshipRoutes } from "./routes/publicInternshipRoutes";
import { publicNewsletterRoutes } from "./routes/publicNewsletterRoutes";

const app = express();
dotenv.config({ override: true });

const allowedOrigins = process.env.CORS_ORIGIN?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !allowedOrigins || allowedOrigins.length === 0) {
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
  }),
);

app.use(express.json());
app.use("/", healthRoutes);
app.use("/", publicContactRoutes);
app.use("/", publicInternshipRoutes);
app.use("/", publicNewsletterRoutes);
app.use("/", adminAuthRoutes);
app.use("/", adminContactRoutes);
app.use("/", adminInternshipRoutes);
app.use("/", adminNewsletterRoutes);

export { app };
