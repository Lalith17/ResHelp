import express from "express";
import {
  signUp,
  login,
  getUser,
  updatePassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/getUser", protect, getUser);
router.post("/updatePassword", protect, updatePassword);

export default router;
// This code defines an Express router for authentication routes.
