import express from "express";
import {
  getMatchCertificates,
  getMatchProjects,
  getMatchExperiences,
  getMatchAll,
} from "../controllers/match.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/certificates", protect, getMatchCertificates);
router.post("/projects", protect, getMatchProjects);
router.post("/experiences", protect, getMatchExperiences);
router.post("/all", protect, getMatchAll);

export default router;
