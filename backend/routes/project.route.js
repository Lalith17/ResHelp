import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", protect, createProject);
router.get("/:id", protect, getAllProjects);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
export default router;
// This code defines a set of routes for managing users in an Express application.
