import Project from "../models/project.model.js";
import Certificate from "../models/certificate.model.js";
import Experience from "../models/experience.model.js";
function initStreakMap() {
  const map = {};
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    map[key] = 0;
  }
  return map;
}

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.params.id;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);
    const streakMap = initStreakMap();

    // Count totals
    const [projectCount, certCount, expCount] = await Promise.all([
      Project.countDocuments({ userId }),
      Certificate.countDocuments({ userId }),
      Experience.countDocuments({ userId }),
    ]);

    // Aggregate 30-day activity
    const [projects, certs, exps] = await Promise.all([
      Project.find({ userId, createdAt: { $gte: fromDate } }),
      Certificate.find({ userId, createdAt: { $gte: fromDate } }),
      Experience.find({ userId, createdAt: { $gte: fromDate } }),
    ]);

    [...projects, ...certs, ...exps].forEach((item) => {
      const dateKey = new Date(item.createdAt).toISOString().split("T")[0];
      if (streakMap[dateKey] !== undefined) {
        streakMap[dateKey] += 1;
      }
    });

    res.json({
      total: {
        projects: projectCount,
        certificates: certCount,
        experiences: expCount,
      },
      activityStreak: streakMap,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
