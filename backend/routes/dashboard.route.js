import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/:id", protect, getDashboardData);
export default router;
