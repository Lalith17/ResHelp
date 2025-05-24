import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userstore";
export const CertificateForm = ({ onClose, onSubmit, editData }) => {
  const userData = useUserStore((state) => state.userData);
  const [formData, setFormData] = useState({
    userId: userData._id,
    name: "",
    link: "",
    description: "",
    issuedBy: "",
    issuedDate: "",
    expirationDate: "",
    skills: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        skills: editData.skills?.join(", ") || "",
        issuedDate: editData.issuedDate?.slice(0, 10) || "",
        expirationDate: editData.expirationDate?.slice(0, 10) || "",
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

    onSubmit({
      ...formData,
      skills: skillsArray,
      issuedDate: formData.issuedDate ? new Date(formData.issuedDate) : null,
      expirationDate: formData.expirationDate
        ? new Date(formData.expirationDate)
        : null,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {editData ? "Edit Certificate" : "Add Certificate"}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Add details about your certification or course completion.
        </p>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Certificate Title
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="issuedBy"
          className="block text-sm font-medium text-gray-700"
        >
          Issuing Organization
        </label>
        <input
          type="text"
          name="issuedBy"
          id="issuedBy"
          value={formData.issuedBy}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Certificate Link (URL)
        </label>
        <input
          type="url"
          name="link"
          id="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="https://example.com/certificate"
        />
      </div>

      <div>
        <label
          htmlFor="issuedDate"
          className="block text-sm font-medium text-gray-700"
        >
          Issue Date
        </label>
        <input
          type="date"
          name="issuedDate"
          id="issuedDate"
          value={formData.issuedDate}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="expirationDate"
          className="block text-sm font-medium text-gray-700"
        >
          Expiration Date (optional)
        </label>
        <input
          type="date"
          name="expirationDate"
          id="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
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

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
          {editData ? "Update Certificate" : "Add Certificate"}
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
