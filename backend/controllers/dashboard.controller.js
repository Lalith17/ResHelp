import Auth from "../models/auth.model.js";
import Project from "../models/project.model.js";
import Certificate from "../models/certificate.model.js";
import User from "../models/user.model.js";
import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    const totalProjects = await Project.countDocuments({ user: userObjectId });
    const totalCertificates = await Certificate.countDocuments({
      user: userObjectId,
    });
    const last30DaysProjects = await Project.aggregate([
      {
        $match: {
          user: userObjectId,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const last30DaysCertificates = await Certificate.aggregate([
      {
        $match: {
          user: userObjectId,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const mergeActivityData = (projects, certificates) => {
      const streakMap = {};

      // Add project counts
      projects.forEach(({ _id, count }) => {
        streakMap[_id] = { projects: count, certificates: 0 };
      });

      // Add certificate counts
      certificates.forEach(({ _id, count }) => {
        if (!streakMap[_id]) {
          streakMap[_id] = { projects: 0, certificates: count };
        } else {
          streakMap[_id].certificates = count;
        }
      });

      return streakMap;
    };
    const last30DaysProjectsCount = last30DaysProjects.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const last30DaysCertificatesCount = last30DaysCertificates.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const totalActivityLast30Days =
      last30DaysProjectsCount + last30DaysCertificatesCount;

    res.json({
      TotalProjects: totalProjects,
      TotalCertificates: totalCertificates,
      Last30DaysProjects: last30DaysProjectsCount,
      Last30DaysCertificates: last30DaysCertificatesCount,
      TotalActivityLast30Days: totalActivityLast30Days,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
