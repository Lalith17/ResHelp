import Resume from "../models/resume.model.js";

export const createResume = async (req, res) => {
  try {
    const resume = new Resume({ ...req.body });
    const saved = await resume.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating resume", error });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving resume", error });
  }
};

export const updateResume = async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
};
