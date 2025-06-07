import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const BasicsSection = ({ data, onChange, title, tagLine }) => {
  const updateField = (field, value) => {
    if (field.startsWith("location.")) {
      const locationField = field.split(".")[1];
      onChange({
        ...data,
        location: {
          ...data.location,
          [locationField]: value,
        },
      });
    } else {
      onChange({
        ...data,
        [field]: value,
      });
    }
  };

  const updateLink = (index, value) => {
    const updatedLinks = [...(data.links || [])];
    updatedLinks[index] = value;
    onChange({ ...data, links: updatedLinks });
  };

  const addLink = () => {
    onChange({ ...data, links: [...(data.links || []), ""] });
  };

  const removeLink = (index) => {
    const updatedLinks = [...(data.links || [])];
    updatedLinks.splice(index, 1);
    onChange({ ...data, links: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{tagLine}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.name}
            placeholder="John Doe"
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="(555) 123-4567"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Links</Label>
          <div className="space-y-2">
            {(data.links || []).map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="url"
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeLink(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addLink}>
              + Add Link
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={data.location?.address || ""}
          onChange={(e) => updateField("location.address", e.target.value)}
          placeholder="123 Main Street"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary || ""}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="A brief overview of your professional background and career objectives..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default BasicsSection;
