import express from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  checkOnboarding,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();
router.post("/", protect, createUser);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.get("/checkOnboarding/:id", checkOnboarding);
router.post("/imageUpload", upload.single("profilePic"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/api/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});
export default router;
// This code defines a set of routes for managing users in an Express application.
