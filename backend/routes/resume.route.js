import express from "express";
import {
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", protect, createResume);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);
export default router;
