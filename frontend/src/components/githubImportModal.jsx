import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function GitHubImportModal({ onClose, onImport, reposistories }) {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setRepos(reposistories);
  }, []);

  // Toggle full repo object selection
  const toggleSelect = (repo) => {
    setSelected((prev) => {
      const exists = prev.find((r) => r.html_url === repo.html_url);
      if (exists) {
        return prev.filter((r) => r.html_url !== repo.html_url);
      } else {
        return [...prev, repo];
      }
    });
  };

  // Select or deselect all full repo objects
  const handleSelectAll = () => {
    if (selected.length === repos.length) {
      setSelected([]);
    } else {
      setSelected(repos);
    }
  };

  // Pass full selected repo objects on submit
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

          {/* Select All Toggle */}
          <div className="mb-2">
            <button
              onClick={handleSelectAll}
              className="text-sm text-indigo-600 hover:underline"
            >
              {selected.length === repos.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2 mb-4">
            {repos.map((repo) => (
              <label
                key={repo.id}
                className="flex items-center space-x-2 border rounded p-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!selected.find((r) => r.html_url === repo.html_url)}
                  onChange={() => toggleSelect(repo)}
                />
                <span className="text-sm font-medium">{repo.name}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 flex justify-end space-x-2">
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
  );
}
