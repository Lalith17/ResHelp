import Certificate from "../models/certificate.model.js";
import { extractKeywords } from "../utils/extractKeywords.js";
export const createCertificate = async (req, res) => {
  const item = req.body;
  try {
    const textToExtract = `${item.name} ${item.description} ${item.issuedBy} ${item.skills}`;
    const keywords = await extractKeywords(textToExtract);
    const newCertificate = new Certificate({ ...item, keywords });
    await newCertificate.save();
    res.status(201).json({ success: true, data: newCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificateById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Certificate ID is required" });
  }
  try {
    const item = await Certificate.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  const id = req.params.id;
  const item = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Certificate ID is required" });
  }
  try {
    const textToExtract = `${item.name} ${item.description} ${item.issuedBy} ${item.skills}`;
    const keywords = await extractKeywords(textToExtract);

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      { ...item, keywords },
      { new: true }
    );

    if (!updatedCertificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res.status(200).json({ success: true, data: updatedCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteCertificate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Certificate ID is required" });
  }
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(id);
    if (!deletedCertificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res.status(200).json({ success: true, data: deletedCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllCertificates = async (req, res) => {
  try {
    const items = await Certificate.find({ userId: req.params.id });

    if (!items?.length) {
      return res.status(200).json({
        success: false,
        message: "No certificates found for this user",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// This code defines a set of functions for managing items in a MongoDB database using Mongoose.
