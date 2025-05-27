import axios from "axios";
import Project from "../models/project.model.js";
import Experience from "../models/experience.model.js";
import Certificate from "../models/certificate.model.js";

export const getMatch = async (req, res) => {
  const { jobDescription, userId } = req.body;
  if (!jobDescription || !userId) {
    return res
      .status(400)
      .json({ error: "jobDescription and userId required" });
  }
  try {
    // Fetch user data concurrently
    const [projects, experiences, certificates] = await Promise.all([
      Project.find({ userId }),
      Experience.find({ userId }),
      Certificate.find({ userId }),
    ]);

    // Prepare minimal data with only id + keywords for matching
    const certsForMatch = prepareForMatching(certificates);
    const projsForMatch = prepareForMatching(projects);
    const expsForMatch = prepareForMatching(experiences);

    // Call Python API with minimal keyword data
    const response = await axios.post("http://localhost:8001/match", {
      text: jobDescription,
      certificates: certsForMatch,
      projects: projsForMatch,
      experiences: expsForMatch,
    });

    const {
      certificates: matchedCerts,
      projects: matchedProjs,
      experiences: matchedExps,
      overall_score: overall_score,
    } = response.data;

    const finalCerts = filterFullDataByMatchedIdsNoScore(
      certificates,
      matchedCerts
    );
    const finalProjs = filterFullDataByMatchedIdsNoScore(
      projects,
      matchedProjs
    );
    const finalExps = filterFullDataByMatchedIdsNoScore(
      experiences,
      matchedExps
    );

    // Send full matched data to frontend
    res.json({
      certificates: finalCerts,
      projects: finalProjs,
      experiences: finalExps,
      overall_score: overall_score,
    });
  } catch (err) {
    console.error("Matching error:", err);
    res.status(500).json({ error: "Matching failed" });
  }
};

const prepareForMatching = (items) => {
  return items.map(({ _id, keywords }) => ({
    id: _id.toString(),
    keywords,
  }));
};

const filterFullDataByMatchedIdsNoScore = (allItems, matchedItems) => {
  const matchedIds = new Set(matchedItems.map((item) => item.id));
  return allItems
    .filter((item) => matchedIds.has(item._id.toString()))
    .map((item) => item.toObject());
};
