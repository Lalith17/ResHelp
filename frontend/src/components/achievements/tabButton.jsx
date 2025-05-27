import React from "react";

const TabButton = ({ active, onClick, icon, label, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center border-b-2 px-1 py-4 text-sm font-medium w-full ${className} ${
        active
          ? "border-indigo-500 text-indigo-600"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default TabButton;
