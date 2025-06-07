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

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const SkillsSection = ({ data, onChange, tagLine, title }) => {
  const addSkill = () => {
    onChange([...data, { name: "", level: "Intermediate", keywords: [] }]);
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (index, field, value) => {
    const updated = data.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange(updated);
  };

  const updateKeywords = (index, keywords) => {
    const keywordArray = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);
    updateSkill(index, "keywords", keywordArray);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{tagLine}</p>
        </div>
        <Button
          onClick={addSkill}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {data.map((skill, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Skill {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Skill Name *</Label>
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  placeholder="JavaScript, Python, etc."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Proficiency Level</Label>
                <Select
                  value={skill.level}
                  onValueChange={(value) => updateSkill(index, "level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Related Technologies (comma-separated)</Label>
              <Input
                value={skill.keywords.join(", ")}
                onChange={(e) => updateKeywords(index, e.target.value)}
                placeholder="React, Node.js, Express, MongoDB"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
