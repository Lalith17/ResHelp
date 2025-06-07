import axios from "axios";
import Project from "../models/project.model.js";
import Experience from "../models/experience.model.js";
import Certificate from "../models/certificate.model.js";

const prepareForMatching = (items) =>
  items.map(({ _id, keywords }) => ({
    id: _id.toString(),
    keywords,
  }));

const filterFullDataByMatchedIdsNoScore = (allItems, matchedItems) => {
  const matchedIds = new Set(matchedItems.map((item) => item.id));
  return allItems
    .filter((item) => matchedIds.has(item._id.toString()))
    .map((item) => item.toObject());
};

const matchByType = async (jobDescription, userId, Model, top_n = 3) => {
  const items = await Model.find({ userId });
  const forMatch = prepareForMatching(items);

  const response = await axios.post("http://localhost:8001/match", {
    jd_text: jobDescription,
    entries: forMatch,
    top_n,
  });

  const matched = response.data.top_matches || [];
  const finalItems = filterFullDataByMatchedIdsNoScore(items, matched);

  return {
    matchedItems: finalItems,
    average_score: response.data.average_score || 0,
  };
};

export const getMatchCertificates = async (req, res) => {
  const { jobDescription, userId, top_n } = req.body;
  if (!jobDescription || !userId) {
    return res
      .status(400)
      .json({ error: "jobDescription and userId required" });
  }
  try {
    const { matchedItems, average_score } = await matchByType(
      jobDescription,
      userId,
      Certificate,
      top_n || 3
    );
    res.json({ matchedItems, average_score });
  } catch (err) {
    console.error("Certificate matching error:", err);
    res.status(500).json({ error: "Matching failed" });
  }
};

export const getMatchProjects = async (req, res) => {
  const { jobDescription, userId, top_n } = req.body;
  if (!jobDescription || !userId) {
    return res
      .status(400)
      .json({ error: "jobDescription and userId required" });
  }
  try {
    const { matchedItems, average_score } = await matchByType(
      jobDescription,
      userId,
      Project,
      top_n || 3
    );
    res.json({ matchedItems, average_score });
  } catch (err) {
    console.error("Project matching error:", err);
    res.status(500).json({ error: "Matching failed" });
  }
};

export const getMatchExperiences = async (req, res) => {
  const { jobDescription, userId, top_n } = req.body;
  if (!jobDescription || !userId) {
    return res
      .status(400)
      .json({ error: "jobDescription and userId required" });
  }
  try {
    const { matchedItems, average_score } = await matchByType(
      jobDescription,
      userId,
      Experience,
      top_n || 3
    );
    res.json({ matchedItems, average_score });
  } catch (err) {
    console.error("Experience matching error:", err);
    res.status(500).json({ error: "Matching failed" });
  }
};

export const getMatchAll = async (req, res) => {
  const { jobDescription, userId, top_n } = req.body;
  if (!jobDescription || !userId) {
    return res
      .status(400)
      .json({ error: "jobDescription and userId required" });
  }
  try {
    const [certResults, projResults, expResults] = await Promise.all([
      matchByType(jobDescription, userId, Certificate, top_n || 3),
      matchByType(jobDescription, userId, Project, top_n || 3),
      matchByType(jobDescription, userId, Experience, top_n || 3),
    ]);

    // Calculate overall average score (weighted by counts)
    const allScores = [
      ...certResults.matchedItems.map((m) => m.score || 0),
      ...projResults.matchedItems.map((m) => m.score || 0),
      ...expResults.matchedItems.map((m) => m.score || 0),
    ].filter((score) => score > 0);

    const overall_score = allScores.length
      ? allScores.reduce((a, b) => a + b, 0) / allScores.length
      : 0;

    res.json({
      certificates: certResults.matchedItems,
      projects: projResults.matchedItems,
      experiences: expResults.matchedItems,
      overall_score,
    });
  } catch (err) {
    console.error("Matching error:", err);
    res.status(500).json({ error: "Matching failed" });
  }
};
