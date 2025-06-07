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

const fluencyLevels = [
  "Native",
  "Fluent",
  "Proficient",
  "Intermediate",
  "Beginner",
];

const LanguagesSection = ({ data, onChange, tagLine, title }) => {
  const addLanguage = () => {
    onChange([...data, { language: "", fluency: "Intermediate" }]);
  };

  const removeLanguage = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateLanguage = (index, field, value) => {
    const updated = data.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
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
          onClick={addLanguage}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Language
        </Button>
      </div>

      {data.map((language, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Language {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Language *</Label>
                <Input
                  value={language.language}
                  onChange={(e) =>
                    updateLanguage(index, "language", e.target.value)
                  }
                  placeholder="Spanish"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Fluency Level</Label>
                <Select
                  value={language.fluency}
                  onValueChange={(value) =>
                    updateLanguage(index, "fluency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fluencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No languages added yet. Click "Add Language" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default LanguagesSection;
