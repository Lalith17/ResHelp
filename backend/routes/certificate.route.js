import express from "express";
import {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAllCertificates,
} from "../controllers/certificate.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/", protect, createCertificate);
router.get("/:id", protect, getAllCertificates);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);
export default router;
// This code defines a set of routes for managing users in an Express application.
