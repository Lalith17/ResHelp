import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
export const JDModal = ({ isOpen, onClose, onSubmit, initialValue }) => {
  const [inputValue, setInputValue] = React.useState(initialValue || "");

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Enter Job Description</h3>
        <textarea
          rows={6}
          className="w-full p-2 border rounded-md resize-none"
          placeholder="Paste or type the job description here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (inputValue.trim()) {
                onSubmit(inputValue.trim());
              }
            }}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={!inputValue.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
