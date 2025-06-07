import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Cpu } from "lucide-react";
import CertificateCard from "@/components/achievements/certificateCard";
import ProjectCard from "@/components/achievements/projectCard";
import ExperienceCard from "@/components/achievements/experienceCard";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { useUserStore } from "@/store/userstore";
import { JDModal } from "./JobDescriptionModal";

const titleMap = {
  Certifications: {
    getAll: API_PATHS.CERTIFICATE.CERTIFICATE_ALLOPS,
    importAI: API_PATHS.MATCH.MATCH_CERTIFICATES,
    CardComponent: CertificateCard,
    cardPropKey: "certificate",
    addLabel: "Add Certification",
    emptyMessage:
      'No certifications added yet. Click "Add Certification" to get started.',
  },
  Projects: {
    getAll: API_PATHS.PROJECT.PROJECT_ALLOPS,
    importAI: API_PATHS.MATCH.MATCH_PROJECTS,
    CardComponent: ProjectCard,
    cardPropKey: "project",
    addLabel: "Add Project",
    emptyMessage: 'No projects added yet. Click "Add Project" to get started.',
  },
  Experiences: {
    getAll: API_PATHS.EXPERIENCE.EXPERIENCE_ALLOPS,
    importAI: API_PATHS.MATCH.MATCH_EXPERIENCES,
    CardComponent: ExperienceCard,
    cardPropKey: "experience",
    addLabel: "Add Experience",
    emptyMessage:
      'No experiences added yet. Click "Add Experience" to get started.',
  },
};

const RecordsSection = ({
  data,
  onChange,
  tagLine,
  title,
  jobDescription,
  setJobDescription,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [availableRecords, setAvailableRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState(null);
  const [hasImportedAI, setHasImportedAI] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    // Reset all when title changes
    setIsSelecting(false);
    setAvailableRecords([]);
    setSelectedRecords([]);
    setLoadingAI(false);
    setErrorAI(null);
    setHasImportedAI(false);
  }, [title]);

  const mapItem = titleMap[title];
  const CardComponent = mapItem.CardComponent;

  const handleModalSubmit = (enteredJD) => {
    setJobDescription(enteredJD);
    setIsModalOpen(false);
    handleAIImportClick(enteredJD); // Pass the fresh job description
  };

  const handleAIImportClick = async (jd) => {
    const jobDescToUse = jd ?? jobDescription; // Use argument if provided

    if (!jobDescToUse || jobDescToUse.trim() === "") {
      setIsModalOpen(true);
      return;
    }
    if (hasImportedAI) return;

    setLoadingAI(true);
    setErrorAI(null);
    try {
      const res = await axiosInstance.post(mapItem.importAI, {
        jobDescription: jobDescToUse,
        userId: userData._id,
      });

      const aiItems = res.data.matchedItems.filter(
        (item) => !data.some((d) => d._id === item._id)
      );

      onChange([...data, ...aiItems]);
      setHasImportedAI(true);
    } catch {
      setErrorAI(`Failed to import AI ${title.toLowerCase()}.`);
    } finally {
      setLoadingAI(false);
    }
  };

  const syncSelectedIndexes = (items) => {
    const selected = items.reduce((acc, item, idx) => {
      if (data.some((d) => d._id === item._id)) acc.push(idx);
      return acc;
    }, []);
    setSelectedRecords(selected);
  };

  const handleToggleSelector = async () => {
    if (!isSelecting) {
      if (availableRecords.length === 0) {
        const res = await axiosInstance.get(mapItem.getAll(userData._id));
        setAvailableRecords(res.data.data);
        syncSelectedIndexes(res.data.data);
      } else {
        syncSelectedIndexes(availableRecords);
      }
    } else {
      const selected = availableRecords.filter((_, idx) =>
        selectedRecords.includes(idx)
      );
      onChange(selected);
    }
    setIsSelecting(!isSelecting);
  };

  const handleSelectToggle = (index) => {
    setSelectedRecords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeRecord = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{tagLine}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleAIImportClick(jobDescription)} // pass current jobDescription explicitly
            size="sm"
            disabled={loadingAI || hasImportedAI}
            className="flex items-center gap-1"
            variant="secondary"
          >
            <Cpu className="h-4 w-4" />
            {loadingAI
              ? "Importing..."
              : hasImportedAI
              ? "Imported"
              : "Import by AI"}
          </Button>

          <Button
            onClick={handleToggleSelector}
            size="sm"
            className="flex items-center gap-2"
          >
            {isSelecting ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {isSelecting ? "Done" : mapItem.addLabel}
          </Button>
        </div>
      </div>

      {errorAI && <p className="text-red-500 text-sm mb-2">{errorAI}</p>}

      {isSelecting ? (
        <div className="grid gap-4">
          {availableRecords.map((record, index) => (
            <div key={index} className="flex items-center gap-4 w-full">
              <input
                type="checkbox"
                checked={selectedRecords.includes(index)}
                onChange={() => handleSelectToggle(index)}
                className="scale-125 cursor-pointer"
              />
              <div
                onClick={() => handleSelectToggle(index)}
                className={`w-full cursor-pointer rounded-lg transition-all ${
                  selectedRecords.includes(index)
                    ? "ring-2 ring-indigo-500"
                    : ""
                }`}
              >
                <CardComponent {...{ [mapItem.cardPropKey]: record }} />
              </div>
            </div>
          ))}
        </div>
      ) : data.length > 0 ? (
        data.map((record, idx) => (
          <div key={idx}>
            <CardComponent
              {...{ [mapItem.cardPropKey]: record }}
              onDelete={() => removeRecord(idx)}
            />
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>{mapItem.emptyMessage}</p>
        </div>
      )}

      <JDModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValue={jobDescription}
      />
    </div>
  );
};

export default RecordsSection;
