import React from "react";
import { Award, Edit, Trash2, Calendar } from "lucide-react";

const CertificateCard = ({ certificate, onEdit, onDelete }) => {
  const showActions = onEdit || onDelete;

  return (
    <div className="group relative flex cursor-pointer items-center p-6 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 transition-shadow">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50">
        <Award className="h-6 w-6 text-indigo-600" />
      </div>
      <div className="ml-4 flex-1 relative flex flex-col">
        <div className="flex items-center justify-between gap-x-12">
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 pr-4 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-medium text-gray-900">
              {certificate.name}
            </h3>
          </a>

          {/* Date fixed right with more left margin */}
          <div className="flex items-center text-xs text-gray-500 whitespace-nowrap ml-8">
            <Calendar className="mr-1 h-4 w-4" />
            {certificate.issuedDate &&
              new Date(certificate.issuedDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </div>
        </div>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-500">{certificate.description}</p>

        {/* Skills and Issuer Row */}
        <div className="mt-3 flex items-center justify-between gap-x-12">
          {/* Skills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {certificate.skills && certificate.skills.length > 0
              ? certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))
              : null}
          </div>

          {/* Issuer fixed right with margin */}
          <span className="text-xs text-gray-500 whitespace-nowrap ml-8">
            Issuer: {certificate.issuedBy}
          </span>
        </div>
      </div>

      {/* Action buttons outside the <a> to avoid hover conflicts */}
      {showActions && (
        <div className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(certificate)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Edit"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(certificate._id)}
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

export default CertificateCard;
