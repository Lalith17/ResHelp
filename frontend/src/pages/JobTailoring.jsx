import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  X,
  Sparkles,
  Code2Icon,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Award,
} from "lucide-react";
import CertificateCard from "../components/achievements/certificateCard";
import ProjectCard from "../components/achievements/projectCard";
import ExperienceCard from "../components/achievements/experienceCard";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useUserStore } from "../store/userstore";
import TabButton from "../components/achievements/tabButton";

const JobTailoring = () => {
  const [activeTab, setActiveTab] = useState("Matched Certificates");
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const [matchscore, setMatchScore] = useState(0);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);

    try {
      const response = await axiosInstance.post(API_PATHS.MATCH.MATCH_ALL, {
        jobDescription,
        userId: userData._id,
      });

      const responseData = response.data?.data || response.data;
      const {
        certificates = [],
        projects = [],
        experiences = [],
        overall_score = 0,
      } = responseData || {};

      setCertificates(Array.isArray(certificates) ? certificates : []);
      setProjects(Array.isArray(projects) ? projects : []);
      setExperiences(Array.isArray(experiences) ? experiences : []);
      setMatchScore(parseFloat((overall_score * 100).toFixed(2)));

      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error analyzing:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setJobDescription("");
    setAnalysisComplete(false);
    setCertificates([]);
    setProjects([]);
    setExperiences([]);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Tailoring</h1>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-900">
            AI Resume Tailoring
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Paste a job description and our AI will analyze it to create a
            perfectly tailored resume.
          </p>

          <div className="mt-6">
            {!analysisComplete ? (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    rows={8}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <p className="mb-5 text-xs text-gray-500">
                  Or upload a job description file (PDF, DOCX, TXT)
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </label>
                    <input id="file-upload" type="file" className="sr-only" />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !jobDescription.trim()}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze & Tailor
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="rounded-lg bg-gray-50 p-6">
                  <div className="flex items-center justify-between">
                    {/* Left: Title + Match Score */}
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Analysis Complete
                      </h3>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Match:
                        </span>
                        <span className="text-sm font-semibold text-green-700">
                          {matchscore}%
                        </span>
                      </div>
                    </div>

                    {/* Right: Close Button */}
                    <button
                      type="button"
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={resetForm}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="mt-4 flex space-x-4 border-b">
                    <nav className="flex w-full">
                      <TabButton
                        active={activeTab === "Matched Certificates"}
                        onClick={() => setActiveTab("Matched Certificates")}
                        icon={<Award className="h-5 w-5" />}
                        label="Matched Certificates"
                        className="w-1/3 text-center"
                      />
                      <TabButton
                        active={activeTab === "Matched Projects"}
                        onClick={() => setActiveTab("Matched Projects")}
                        icon={<Code2Icon className="h-5 w-5" />}
                        label="Matched Projects"
                        className="w-1/3 text-center"
                      />
                      <TabButton
                        active={activeTab === "Matched Experiences"}
                        onClick={() => setActiveTab("Matched Experiences")}
                        icon={<Briefcase className="h-5 w-5" />}
                        label="Matched Experiences"
                        className="w-1/3 text-center"
                      />
                    </nav>
                  </div>

                  {/* Results */}
                  <div className="space-y-4 rounded-lg bg-white shadow">
                    {activeTab === "Matched Certificates" &&
                      certificates.map((cert) => (
                        <CertificateCard key={cert._id} certificate={cert} />
                      ))}
                    {activeTab === "Matched Projects" &&
                      projects.map((proj) => (
                        <ProjectCard key={proj._id} project={proj} />
                      ))}
                    {activeTab === "Matched Experiences" &&
                      experiences.map((exp) => (
                        <ExperienceCard key={exp._id} experience={exp} />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!analysisComplete && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-indigo-600" />}
            title="AI-Powered Analysis"
            description="Our AI analyzes job descriptions to identify key requirements and skills needed."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-blue-600" />}
            title="Customized Resume"
            description="Get a perfectly tailored resume that highlights your most relevant experience."
          />
          <FeatureCard
            icon={<GraduationCap className="h-8 w-8 text-purple-600" />}
            title="Stand Out"
            description="Increase your chances of getting interviews with tailored resumes for each application."
          />
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow transition-transform hover:translate-y-[-2px]">
      <div className="mb-4 inline-flex rounded-full bg-indigo-50 p-3">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default JobTailoring;
