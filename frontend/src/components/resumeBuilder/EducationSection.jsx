import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const studyTypes = [
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Associate Degree",
  "Certificate",
  "Diploma",
  "High School",
  "Other",
];

const EducationSection = ({ data, onChange, title, tagLine }) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        area: "",
        studyType: "Bachelor's Degree",
        startDate: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{tagLine}</p>
        </div>
        <Button
          onClick={addEducation}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {data.map((education, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Education {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input
                value={education.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                placeholder="University of California, Berkeley"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  value={education.area}
                  onChange={(e) =>
                    updateEducation(index, "area", e.target.value)
                  }
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Degree Type</Label>
                <Select
                  value={education.studyType}
                  onValueChange={(value) =>
                    updateEducation(index, "studyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {studyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(index, "startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={education.endDate || ""}
                  onChange={(e) =>
                    updateEducation(index, "endDate", e.target.value)
                  }
                  placeholder="Expected graduation"
                />
              </div>

              <div className="space-y-2">
                <Label>GPA</Label>
                <Input
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="3.8"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
