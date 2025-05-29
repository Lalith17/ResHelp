import Project from "../models/project.model.js";
import { extractKeywords } from "../utils/extractKeywords.js";
import { Octokit } from "@octokit/core";
import Auth from "../models/auth.model.js";
export const createProject = async (req, res) => {
  const item = req.body;
  if (!item.name) {
    return res
      .status(400)
      .json({ success: false, message: "Name and link are required" });
  }
  try {
    const textToExtract = `${item.name} ${item.description} ${item.languages} ${item.tags}`;
    const keywords = await extractKeywords(textToExtract);
    const newProject = new Project({ ...item, keywords });
    await newProject.save();
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Project ID is required" });
  }
  try {
    const item = await Project.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const items = await Project.find({ userId: req.params.id });
    if (!items || items.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No projects found" });
    }
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const id = req.params.id;
  const item = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Project ID is required" });
  }
  try {
    const textToExtract = `${item.name} ${item.description} ${item.languages} ${item.tags}`;
    const keywords = await extractKeywords(textToExtract);
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...item, keywords },
      {
        new: true,
      }
    );
    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Project ID is required" });
  }
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: deletedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGitHubRepos = async (req, res) => {
  try {
    const userAuthId = req.user._id; // From JWT middleware
    const user = await Auth.findById(userAuthId);

    if (!user?.github?.accessToken) {
      return res.status(400).json({ message: "GitHub not connected" });
    }

    const octokit = new Octokit({ auth: user.github.accessToken });
    const { data: repos } = await octokit.request("GET /user/repos", {
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
      per_page: 100,
    });

    res.status(200).json({ repos });
  } catch (error) {
    console.error("GitHub Fetch Repos Error:", error);
    res.status(500).json({ message: "Failed to fetch repositories" });
  }
};

export const importGitHubRepos = async (req, res) => {
  try {
    const userId = req.params.id;
    const selectedRepos = req.body.repos; // Each repo has name, description, html_url

    for (const repo of selectedRepos) {
      const existing = await Project.findOne({
        userId,
        repoLink: repo.html_url,
      });

      if (!existing) {
        const textToExtract = `${repo.name} ${repo.description || ""}`;
        const keywords = await extractKeywords(textToExtract);

        const newProject = new Project({
          userId,
          name: repo.name,
          description: repo.description ? [repo.description] : [],
          repoLink: repo.html_url,
          keywords,
        });

        await newProject.save();
      }
    }

    res.status(200).json({
      message: `New project(s) imported`,
    });
  } catch (error) {
    console.error("GitHub Import Error:", error);
    res.status(500).json({ message: "Failed to import projects" });
  }
};

// This code defines a set of functions for managing items in a MongoDB database using Mongoose.
