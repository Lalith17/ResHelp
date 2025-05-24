import React from "react";
import { Briefcase, Edit, Trash2, Calendar } from "lucide-react";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const showActions = onEdit || onDelete;
  return (
    <div className="group relative flex cursor-pointer items-center p-6 hover:bg-gray-50">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Briefcase className="h-6 w-6 text-blue-600" />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900">
            {project.name}
          </h3>
          {showActions && (
            <div className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
              {onEdit && (
                <button
                  onClick={() => onEdit(project)}
                  className="mr-2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(project._id)}
                  className="rounded p-1 text-gray-500 hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          {project.tags}
          <a
            href={project.repoLink || project.deployedLink}
            className="ml-4 text-indigo-600 hover:text-indigo-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
