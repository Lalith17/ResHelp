import React, { useState, useEffect } from "react";
import { Plus, Award, X } from "lucide-react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useUserStore } from "../store/userstore";
import CertificateCard from "../components/achievements/certificateCard";
import ProjectCard from "../components/achievements/projectCard";
import ExperienceCard from "../components/achievements/experienceCard";
import { CertificateForm } from "../components/achievements/certificateForm";
import { ProjectForm } from "../components/achievements/projectForm";
import { ExperienceForm } from "../components/achievements/experienceForm";
import TabButton from "../components/achievements/tabButton";
import { FileText, Briefcase, Medal } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
const AchievementManager = () => {
  const [activeTab, setActiveTab] = useState("Certificate");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    Certificate: false,
    Project: false,
    Experience: false,
  });
  const userData = useUserStore((state) => state.userData);
  const [editData, setEditData] = useState(null);

  const fetchCertificates = async () => {
    setLoadingStates((prev) => ({ ...prev, Certificate: true }));
    try {
      const response = await axiosInstance.get(
        API_PATHS.CERTIFICATE.CERTIFICATE_ALLOPS(userData._id)
      );
      setCertificates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        Certificate: false,
      }));
    }
  };

  const fetchProjects = async () => {
    setLoadingStates((prev) => ({ ...prev, Project: true }));
    try {
      const response = await axiosInstance.get(
        API_PATHS.PROJECT.PROJECT_ALLOPS(userData._id)
      );
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        Project: false,
      }));
    }
  };

  const fetchExperiences = async () => {
    setLoadingStates((prev) => ({ ...prev, Experience: true }));
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPERIENCE.EXPERIENCE_ALLOPS(userData._id)
      );
      setExperiences(response.data.data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        Experience: false,
      }));
    }
  };

  useEffect(() => {
    if (!userData?._id) return;

    switch (activeTab) {
      case "Certificate":
        fetchCertificates();
        break;
      case "Project":
        fetchProjects();
        break;
      case "Experience":
        fetchExperiences();
        break;
    }
  }, [activeTab, userData]);

  const handleAddCertificate = async (formData) => {
    try {
      if (editData && editData._id) {
        await axiosInstance.put(
          API_PATHS.CERTIFICATE.CERTIFICATE_ALLOPS(editData._id),
          formData
        );
      } else {
        await axiosInstance.post(
          API_PATHS.CERTIFICATE.CREATE_CERTIFICATE,
          formData
        );
      }

      fetchCertificates();
      setIsAddingNew(false);
      setEditData(null);
    } catch (error) {
      console.error("Error adding certificate:", error);
    }
  };

  const handleAddProject = async (formData) => {
    try {
      if (editData && editData._id) {
        await axiosInstance.put(
          API_PATHS.PROJECT.PROJECT_ALLOPS(editData._id),
          formData
        );
      } else {
        await axiosInstance.post(API_PATHS.PROJECT.CREATE_PROJECT, formData);
      }
      fetchProjects();
      setIsAddingNew(false);
      setEditData(null);
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };

  const handleAddExperience = async (formData) => {
    try {
      if (editData && editData._id) {
        await axiosInstance.put(
          API_PATHS.EXPERIENCE.EXPERIENCE_ALLOPS(editData._id),
          formData
        );
      } else {
        await axiosInstance.post(
          API_PATHS.EXPERIENCE.CREATE_EXPERIENCE,
          formData
        );
      }
      fetchExperiences();
      setIsAddingNew(false);
      setEditData(null);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };
  const getCurrentAchievements = () => {
    switch (activeTab) {
      case "Certificate":
        return certificates;
      case "Project":
        return projects;
      case "Experience":
        return experiences;
      default:
        return [];
    }
  };
  const handleEditCertificate = (cert) => {
    setEditData(cert);
    setIsAddingNew(true);
  };
  const handleEditProject = async (project) => {
    setEditData(project);
    setIsAddingNew(true);
  };
  const handleEditExperience = async (experience) => {
    setEditData(experience);
    setIsAddingNew(true);
  };
  const handleDeleteCertificate = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.CERTIFICATE.CERTIFICATE_ALLOPS(id));
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axiosInstance.delete(API_PATHS.PROJECT.PROJECT_ALLOPS(projectId));
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleDeleteExperience = async (experienceId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPERIENCE.EXPERIENCE_ALLOPS(experienceId)
      );
      fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };
  const renderAchievements = () => {
    if (loadingStates[activeTab]) return <LoadingSpinner />;

    const achievements = getCurrentAchievements();

    if (achievements.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Award className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No {activeTab}s found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first {activeTab}
          </p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab}
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "Certificate":
        return certificates.map((cert) => (
          <CertificateCard
            key={cert._id}
            certificate={cert}
            onEdit={() => handleEditCertificate(cert)}
            onDelete={handleDeleteCertificate}
          />
        ));
      case "Project":
        return projects.map((proj) => (
          <ProjectCard
            key={proj._id}
            project={proj}
            onEdit={() => handleEditProject(proj)}
            onDelete={handleDeleteProject}
          />
        ));
      case "Experience":
        return experiences.map((exp) => (
          <ExperienceCard
            key={exp._id}
            experience={exp}
            onEdit={() => handleEditExperience(exp)}
            onDelete={handleDeleteExperience}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Achievement Manager
        </h1>
        <button
          onClick={() => setIsAddingNew(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab}
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <TabButton
            active={activeTab === "Certificate"}
            onClick={() => setActiveTab("Certificate")}
            icon={<FileText className="h-5 w-5" />}
            label="Certificates"
          />
          <TabButton
            active={activeTab === "Project"}
            onClick={() => setActiveTab("Project")}
            icon={<Briefcase className="h-5 w-5" />}
            label="Projects"
          />
          <TabButton
            active={activeTab === "Experience"}
            onClick={() => setActiveTab("Experience")}
            icon={<Medal className="h-5 w-5" />}
            label="Experiences"
          />
        </nav>
      </div>

      {isAddingNew && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsAddingNew(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              {activeTab === "Certificate" && (
                <CertificateForm
                  onClose={() => {
                    setIsAddingNew(false);
                    setEditData(null);
                  }}
                  onSubmit={handleAddCertificate}
                  editData={editData}
                />
              )}
              {activeTab === "Project" && (
                <ProjectForm
                  onClose={() => {
                    setIsAddingNew(false);
                    setEditData(null);
                  }}
                  onSubmit={handleAddProject}
                  editData={editData}
                />
              )}
              {activeTab === "Experience" && (
                <ExperienceForm
                  onClose={() => {
                    setIsAddingNew(false);
                    setEditData(null);
                  }}
                  editData={editData}
                  onSubmit={handleAddExperience}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
        {renderAchievements()}
      </div>
    </div>
  );
};

export default AchievementManager;
