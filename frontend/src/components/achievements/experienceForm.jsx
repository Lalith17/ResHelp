import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userstore";
export const ExperienceForm = ({ onClose, onSubmit, editData }) => {
  const userData = useUserStore((state) => state.userData);
  const [formData, setFormData] = useState({
    userId: userData._id,
    title: "",
    companyName: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        skills: editData.skills?.join(", ") || "",
        description: editData.description?.join("\n") || "",
        startDate: editData.startDate?.slice(0, 10) || "",
        endDate: editData.endDate?.slice(0, 10) || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const descriptionArray = formData.description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    onSubmit({
      ...formData,
      skills: skillsArray,
      description: descriptionArray,
      startDate: formData.startDate ? new Date(formData.startDate) : null,
      endDate: formData.endDate ? new Date(formData.endDate) : null,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {editData ? "Edit Experience" : "Add Experience"}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add details about your professional experience or achievements.
        </p>
      </div>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Position Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (one per line)
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="List your responsibilities or achievements, each on a new line"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-700"
        >
          Skills (comma separated)
        </label>
        <input
          type="text"
          name="skills"
          id="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="e.g. JavaScript, React, Node.js"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
          {editData ? "Update Experience" : "Add Experience"}
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
