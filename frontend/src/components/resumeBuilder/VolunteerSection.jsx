import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const VolunteerSection = ({ data, onChange, tagLine, title }) => {
  const addVolunteer = () => {
    onChange([...data, { organization: "", position: "", startDate: "" }]);
  };

  const removeVolunteer = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateVolunteer = (index, field, value) => {
    const updated = data.map((vol, i) =>
      i === index ? { ...vol, [field]: value } : vol
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
          onClick={addVolunteer}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Volunteer Experience
        </Button>
      </div>

      {data.map((volunteer, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                Volunteer Experience {index + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeVolunteer(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Organization *</Label>
                <Input
                  value={volunteer.organization}
                  onChange={(e) =>
                    updateVolunteer(index, "organization", e.target.value)
                  }
                  placeholder="Red Cross"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={volunteer.position}
                  onChange={(e) =>
                    updateVolunteer(index, "position", e.target.value)
                  }
                  placeholder="Volunteer Coordinator"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={volunteer.startDate}
                  onChange={(e) =>
                    updateVolunteer(index, "startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={volunteer.endDate || ""}
                  onChange={(e) =>
                    updateVolunteer(index, "endDate", e.target.value)
                  }
                  placeholder="Leave empty if ongoing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>description</Label>
              <Textarea
                value={volunteer.description || ""}
                onChange={(e) =>
                  updateVolunteer(index, "summary", e.target.value)
                }
                placeholder="Brief description of your volunteer work and contributions..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>
            No volunteer experience added yet. Click "Add Volunteer Experience"
            to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default VolunteerSection;
