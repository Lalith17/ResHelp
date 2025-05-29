import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userstore";
export const ProjectForm = ({ onClose, onSubmit, editData }) => {
  const userData = useUserStore((state) => state.userData);
  const [formData, setFormData] = useState({
    userId: userData._id,
    name: "",
    languages: "",
    repoLink: "",
    deployedLink: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        userId: editData.userId || userData._id || "",
        name: editData.name || "",
        languages: editData.languages?.join(", ") ?? "",
        repoLink: editData.repoLink || "",
        deployedLink: editData.deployedLink || "",
        description: editData.description?.join("\n") ?? "",
        tags: editData.tags?.join(", ") ?? "",
      });
    }
  }, [editData, userData._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const languagesArray = formData.languages
      .split(",")
      .map((language) => language.trim())
      .filter(Boolean);
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const descriptionArray = formData.description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    onSubmit({
      ...formData,
      languages: languagesArray,
      tags: tagsArray,
      description: descriptionArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {editData ? "Edit Project" : "Add Project"}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add details about your project or portfolio work.
        </p>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Project Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="languages"
          className="block text-sm font-medium text-gray-700"
        >
          Technologies / Languages Used
        </label>
        <input
          type="text"
          name="languages"
          id="languages"
          placeholder="React, TypeScript, Node.js"
          value={formData.languages}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Separate each technology with a comma
        </p>
      </div>

      <div>
        <label
          htmlFor="repoLink"
          className="block text-sm font-medium text-gray-700"
        >
          Repository Link
        </label>
        <input
          type="url"
          name="repoLink"
          id="repoLink"
          value={formData.repoLink}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="deployedLink"
          className="block text-sm font-medium text-gray-700"
        >
          Deployed Project URL (optional)
        </label>
        <input
          type="url"
          name="deployedLink"
          id="deployedLink"
          value={formData.deployedLink}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
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
          placeholder="Describe your project features, goals, or challenges, one per line"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags (optional, comma separated)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="e.g., Web, Mobile, AI"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:col-start-2 sm:text-sm"
        >
          {editData ? "Update Project" : "Add Project"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
