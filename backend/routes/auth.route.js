import express from "express";
import {
  signUp,
  login,
  getUser,
  updatePassword,
  linkedin,
  linkedinCallback,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import passport from "passport";
import { generateTokenAndRedirect } from "../utils/oauth.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/getUser", protect, getUser);
router.post("/updatePassword", protect, updatePassword);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  generateTokenAndRedirect
);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  generateTokenAndRedirect
);
router.get("/linkedin", linkedin);
router.get("/linkedin/callback", linkedinCallback);

export default router;
// This code defines an Express router for authentication routes.
