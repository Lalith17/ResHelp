import React from "react";
import { Code2Icon, Edit, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const showActions = onEdit || onDelete;

  return (
    <div className="group relative flex cursor-pointer items-center p-6 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 transition-shadow">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Code2Icon className="h-6 w-6 text-blue-600" />
      </div>

      {/* Main Content */}
      <div className="ml-4 flex-1 relative flex flex-col">
        {/* Title and Tags in one row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 pr-4 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-medium text-gray-900 mr-4">
              {project.name}
            </h3>
          </a>
        </div>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-500">{project.description}</p>

        {/* Languages */}
        <div className="mt-3 flex items-center justify-between gap-x-12">
          <div className="flex flex-wrap gap-2 flex-1">
            {project.languages?.length > 0 ? (
              project.languages.map((lang, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded"
                >
                  {lang}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs italic">
                No languages listed
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      {showActions && (
        <div className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Edit"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project._id)}
              className="rounded p-1 text-gray-500 hover:bg-red-100 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
