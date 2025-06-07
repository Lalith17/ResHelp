import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Wrench,
  Trophy,
  BookOpen,
  Globe,
  Heart,
  Download,
  Award,
  Code2Icon,
  Briefcase,
} from "lucide-react";
import { cn } from "@/utils/utils";
import BasicsSection from "@/components/resumeBuilder/BasicsSection";
import SkillsSection from "@/components/resumeBuilder/SkillsSection";
import EducationSection from "@/components/resumeBuilder/EducationSection";
import AchievementsSection from "@/components/resumeBuilder/AchievementsSection";
import LanguagesSection from "@/components/resumeBuilder/LanguagesSection";
import VolunteerSection from "@/components/resumeBuilder/VolunteerSection";
import RecordsSection from "@/components/resumeBuilder/RecordsSection";
import CertificateCard from "@/components/achievements/certificateCard";
import ProjectCard from "@/components/achievements/projectCard";
import ExperienceCard from "@/components/achievements/experienceCard";

const sections = {
  Basics: {
    title: "Personal Information",
    icon: User,
    component: BasicsSection,
  },
  Skills: {
    title: "Skills & Competencies",
    icon: Wrench,
    component: SkillsSection,
  },
  Accomplishments: {
    title: "Accomplishments",
    icon: Trophy,
    component: AchievementsSection,
  },
  Education: {
    title: "Education",
    icon: BookOpen,
    component: EducationSection,
  },
  Languages: {
    title: "Languages",
    icon: Globe,
    component: LanguagesSection,
  },
  Volunteer: {
    title: "Volunteer Experience",
    icon: Heart,
    component: VolunteerSection,
  },
  Certificates: {
    title: "Certifications",
    icon: Award,
    component: RecordsSection,
  },
  Projects: {
    title: "Projects",
    icon: Code2Icon,
    component: RecordsSection,
  },
  Experiences: {
    title: "Experiences",
    icon: Briefcase,
    component: RecordsSection,
  },
};

const ResumeBuilderSidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="px-4 py-3">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {Object.entries(sections).map(([id, { icon: Icon }]) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={cn(
                "flex items-center space-x-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 whitespace-nowrap",
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-gray-500"
                )}
              />
              <span>{id}</span> {/* Use id here instead of title */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("Basics");
  const [resumeData, setResumeData] = useState({
    basics: {
      name: "",
      email: "",
      phone: "",
      location: "",
      links: [],
      summary: "",
    },
    skills: [],
    languages: [],
    education: [],
    accomplishments: [],
    volunteer: [],
    certificates: [],
    projects: [],
    experiences: [],
  });
  const [jobDescription, setJobDescription] = useState("");

  const updateSection = (section, data) => {
    setResumeData((prev) => ({ ...prev, [section.toLowerCase()]: data }));
  };

  const handleGenerateResume = () => {
    console.log("Resume Data:", JSON.stringify(resumeData, null, 2));
    alert("Resume data logged to console. Check developer tools.");
  };

  const SectionComponent = sections[activeSection]?.component;
  const sectionTitle = sections[activeSection]?.title || "Section Title";
  const sectionTagLine =
    sections[activeSection]?.tagLine ||
    "Fill in the information for this section. Your changes are automatically saved.";
  const sectionData = resumeData[activeSection.toLowerCase()];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header + Sidebar Container */}
        <div className="rounded-lg bg-white shadow p-6 mb-6 flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Build Your Resume
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Create a professional resume with our easy-to-use form.
              </p>
            </div>

            <Button
              onClick={handleGenerateResume}
              className="mt-2 flex items-center gap-2 rounded-md text-indigo-600 hover:text-indigo-700"
            >
              <Download className="h-4 w-4" />
              Generate Resume
            </Button>
          </div>

          <ResumeBuilderSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main content container */}
        <div className="mt-6 w-full max-w-full">
          <Card className="rounded-lg bg-white shadow w-full max-w-full">
            <CardContent className="p-6">
              {SectionComponent ? (
                <SectionComponent
                  data={sectionData}
                  title={sectionTitle}
                  tagLine={sectionTagLine}
                  onChange={(data) => updateSection(activeSection, data)}
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                />
              ) : (
                <p>Section not found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
