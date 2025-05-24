import express from "express";
import { getMatch } from "../controllers/match.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", protect, getMatch);
export default router;
