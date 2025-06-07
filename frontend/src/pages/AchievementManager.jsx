import React, { useState, useEffect, useCallback } from "react";
import { Plus, Award, X, Briefcase, Code2Icon } from "lucide-react";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useUserStore } from "../store/userstore";
import CertificateCard from "@/components/achievements/certificateCard";
import ProjectCard from "../components/achievements/projectCard";
import ExperienceCard from "../components/achievements/experienceCard";
import { CertificateForm } from "../components/achievements/certificateForm";
import { ProjectForm } from "../components/achievements/projectForm";
import { ExperienceForm } from "../components/achievements/experienceForm";
import TabButton from "../components/achievements/tabButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { GitHubImportModal } from "../components/githubImportModal";

const TABS = {
  Certificate: {
    label: "Certificates",
    icon: Award,
    fetch: API_PATHS.CERTIFICATE.CERTIFICATE_ALLOPS,
    create: API_PATHS.CERTIFICATE.CREATE_CERTIFICATE,
    component: CertificateCard,
    form: CertificateForm,
  },
  Project: {
    label: "Projects",
    icon: Code2Icon,
    fetch: API_PATHS.PROJECT.PROJECT_ALLOPS,
    create: API_PATHS.PROJECT.CREATE_PROJECT,
    component: ProjectCard,
    form: ProjectForm,
  },
  Experience: {
    label: "Experiences",
    icon: Briefcase,
    fetch: API_PATHS.EXPERIENCE.EXPERIENCE_ALLOPS,
    create: API_PATHS.EXPERIENCE.CREATE_EXPERIENCE,
    component: ExperienceCard,
    form: ExperienceForm,
  },
};

const AchievementManager = () => {
  const [activeTab, setActiveTab] = useState("Certificate");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState({
    Certificate: [],
    Project: [],
    Experience: [],
  });
  const [loading, setLoading] = useState({
    Certificate: false,
    Project: false,
    Experience: false,
    Repos: false,
  });
  const [fetchedTabs, setFetchedTabs] = useState({
    Certificate: false,
    Project: false,
    Experience: false,
  });
  const [repos, setRepos] = useState([]);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const userData = useUserStore((state) => state.userData);

  const fetchData = useCallback(
    async (tab) => {
      setLoading((prev) => ({ ...prev, [tab]: true }));
      try {
        const res = await axiosInstance.get(TABS[tab].fetch(userData._id));
        setData((prev) => ({ ...prev, [tab]: res.data.data || [] }));
        setFetchedTabs((prev) => ({ ...prev, [tab]: true }));
      } catch (err) {
        console.error(`Error fetching ${tab}:`, err);
      } finally {
        setLoading((prev) => ({ ...prev, [tab]: false }));
      }
    },
    [userData]
  );

  useEffect(() => {
    if (userData?._id && !fetchedTabs[activeTab]) {
      fetchData(activeTab);
    }
  }, [activeTab, userData, fetchedTabs, fetchData]);

  const handleSave = async (formData) => {
    try {
      if (editData?._id) {
        await axiosInstance.put(TABS[activeTab].fetch(editData._id), formData);
      } else {
        await axiosInstance.post(TABS[activeTab].create, formData);
      }
      fetchData(activeTab);
      setIsAddingNew(false);
      setEditData(null);
    } catch (err) {
      console.error(`Error saving ${activeTab}:`, err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(TABS[activeTab].fetch(id));
      fetchData(activeTab);
    } catch (err) {
      console.error(`Error deleting ${activeTab}:`, err);
    }
  };

  const handleGitHubImport = async () => {
    if (repos.length > 0) {
      setShowGitHubModal(true); // already fetched, just show the modal
      return;
    }

    setLoading((prev) => ({ ...prev, Repos: true }));
    try {
      const res = await axiosInstance.get(
        API_PATHS.PROJECT.GET_ALL_GITHUB_REPOS
      );
      setRepos(res.data.repos || []);
      setShowGitHubModal(true);
    } catch (err) {
      console.error("Failed to fetch GitHub repos", err);
    } finally {
      setLoading((prev) => ({ ...prev, Repos: false }));
    }
  };

  const handleImport = async (selectedRepos) => {
    try {
      await axiosInstance.post(
        API_PATHS.PROJECT.IMPORT_GITHUB_REPOS(userData._id),
        {
          repos: selectedRepos.map((repo) => ({
            name: repo.name || "",
            description: repo.description || "",
            html_url: repo.html_url || "",
          })),
        }
      );
      fetchData("Project");
      setShowGitHubModal(false);
    } catch (err) {
      console.error("Error importing repos", err);
    }
  };

  const CurrentForm = TABS[activeTab].form;
  const CurrentCard = TABS[activeTab].component;
  const items = data[activeTab];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Achievement Manager</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {activeTab}
          </button>
          {activeTab === "Project" && (
            <button
              onClick={handleGitHubImport}
              disabled={loading.Repos}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-sm hover:bg-gray-900"
            >
              {loading.Repos ? (
                <LoadingSpinner className="w-4 h-4 mr-2" />
              ) : (
                <svg
                  className="mr-2 h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.018.005 2.044.137 3.003.403 2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.63-5.475 5.922.43.372.823 1.103.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .32.218.698.825.58C20.565 21.795 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
                </svg>
              )}
              Import from GitHub
            </button>
          )}
        </div>
      </div>

      <div className="flex w-full rounded-lg bg-white shadow">
        {Object.entries(TABS).map(([key, tab]) => (
          <TabButton
            key={key}
            active={activeTab === key}
            onClick={() => setActiveTab(key)}
            icon={<tab.icon className="w-5 h-5" />}
            label={tab.label}
            className="w-1/3 text-center"
          />
        ))}
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
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditData(null);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <CurrentForm
                onClose={() => {
                  setIsAddingNew(false);
                  setEditData(null);
                }}
                onSubmit={handleSave}
                editData={editData}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-lg bg-white shadow">
        {loading[activeTab] ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            {React.createElement(TABS[activeTab].icon, {
              className: "w-12 h-12 text-gray-400",
            })}
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No {activeTab}s found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first {activeTab}
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab}
            </button>
          </div>
        ) : (
          items.map((item) => (
            <CurrentCard
              key={item._id}
              {...{ [activeTab.toLowerCase()]: item }}
              onEdit={() => {
                setEditData(item);
                setIsAddingNew(true);
              }}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>

      {showGitHubModal && !loading.Repos && (
        <GitHubImportModal
          repositories={repos}
          onImport={handleImport}
          onClose={() => setShowGitHubModal(false)}
        />
      )}
    </div>
  );
};

export default AchievementManager;
