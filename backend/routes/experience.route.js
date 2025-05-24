import express from "express";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  getAllExperiences,
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", protect, createExperience);
router.get("/:id", protect, getAllExperiences);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);
export default router;
