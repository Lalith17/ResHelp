import React from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-10 w-10 text-red-600" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
