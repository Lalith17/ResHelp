import { useState, useMemo } from "react";
import { X, ToggleLeft, ToggleRight } from "lucide-react";
import ProjectCard from "./achievements/projectCard";

export function GitHubImportModal({ onClose, onImport, repositories }) {
  const [selected, setSelected] = useState([]);

  const isSelected = useMemo(() => {
    const urls = new Set(selected.map((repo) => repo.html_url));
    return (repo) => urls.has(repo.html_url);
  }, [selected]);

  const toggleSelect = (repo) => {
    setSelected((prev) =>
      isSelected(repo)
        ? prev.filter((r) => r.html_url !== repo.html_url)
        : [...prev, repo]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === repositories.length) {
      setSelected([]);
    } else {
      setSelected(repositories);
    }
  };

  const handleSubmit = () => {
    onImport(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="inline-block w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Select GitHub Repositories
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-yellow-800 bg-yellow-100 px-2 py-1 rounded mb-4">
            After importing repositories, please review and edit the necessary
            fields so our AI can process them better.
          </p>

          <div className="max-h-[300px] overflow-y-auto space-y-2 mb-4">
            {repositories.map((repo) => (
              <label
                key={repo.id}
                className="flex items-center space-x-2 border rounded p-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected(repo)}
                  onChange={() => toggleSelect(repo)}
                />
                <ProjectCard project={repo} />
              </label>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleSelectAll}
              aria-pressed={selected.length === repositories.length}
              className={`inline-flex items-center rounded-md px-3 py-1 transition-colors focus:outline-none ${
                selected.length === repositories.length
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {selected.length === repositories.length ? (
                <ToggleRight className="h-5 w-5" />
              ) : (
                <ToggleLeft className="h-5 w-5" />
              )}
              <span className="ml-1 text-sm select-none">
                {selected.length === repositories.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                disabled={selected.length === 0}
              >
                Import Selected ({selected.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
