import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const AchievementsSection = ({ data, onChange, tagLine, title }) => {
  const addAchievement = () => {
    onChange([...data, { title: "", date: "", description: "" }]);
  };

  const removeAchievement = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAchievement = (index, field, value) => {
    const updated = data.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
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
          onClick={addAchievement}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {data.map((achievement, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                Achievement {index + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAchievement(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={achievement.title}
                onChange={(e) =>
                  updateAchievement(index, "title", e.target.value)
                }
                placeholder="Employee of the Year"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={achievement.description}
                onChange={(e) =>
                  updateAchievement(index, "description", e.target.value)
                }
                placeholder="Description of the achievement and its significance..."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>
            No achievements added yet. Click "Add Achievement" to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;
