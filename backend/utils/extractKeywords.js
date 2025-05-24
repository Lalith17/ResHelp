import axios from "axios";

export const extractKeywords = async (text) => {
  try {
    const response = await axios.post(
      "http://localhost:8001/extract-keywords",
      { text }
    );
    return [
      ...new Set(response.data.keywords.map((k) => k.toLowerCase().trim())),
    ];
  } catch (err) {
    console.error("Keyword extraction failed:", err);
    return [];
  }
};
