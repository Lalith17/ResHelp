import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import "./config/passport.js";
import userRoutes from "./routes/user.route.js";
import certRoutes from "./routes/certificate.route.js";
import projectRoutes from "./routes/project.route.js";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import experienceRoutes from "./routes/experience.route.js";
import resumeRoutes from "./routes/resume.route.js";
import matchRoutes from "./routes/match.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users", userRoutes);
app.use("/api/certificates", certRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
