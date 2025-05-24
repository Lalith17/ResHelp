import Experience from "../models/experience.model.js";
import { extractKeywords } from "../utils/extractKeywords.js";
export const createExperience = async (req, res) => {
  const item = req.body;
  try {
    const textToExtract = `${item.title} ${item.description} ${item.companyName} ${item.skills}`;
    const keywords = await extractKeywords(textToExtract);
    const experience = new Experience({ ...item, keywords });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error creating experience", error });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience", error });
  }
};

export const updateExperience = async (req, res) => {
  const item = req.body;
  try {
    const textToExtract = `${item.title} ${item.description} ${item.companyName} ${item.skills}`;
    const keywords = await extractKeywords(textToExtract);
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      { ...item, keywords },
      {
        new: true,
      }
    );
    if (!updatedExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ message: "Error updating experience", error });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience", error });
  }
};

export const getAllExperiences = async (req, res) => {
  try {
    const items = await Experience.find({ userId: req.params.id });
    if (!items || items.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No experiences found" });
    }
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
