import React from "react";
import { FileText, Edit, Trash2, Calendar } from "lucide-react";

const CertificateCard = ({ certificate, onEdit, onDelete }) => {
  const showActions = onEdit || onDelete;

  return (
    <div className="group relative flex cursor-pointer items-center p-6 hover:bg-gray-50">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50">
        <FileText className="h-6 w-6 text-indigo-600" />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900">
            {certificate.name}
          </h3>
          {showActions && (
            <div className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
              {onEdit && (
                <button
                  onClick={() => onEdit(certificate)}
                  className="mr-2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(certificate._id)}
                  className="rounded p-1 text-gray-500 hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">{certificate.description}</p>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <Calendar className="mr-1 h-4 w-4" />
          {certificate.issuedDate}
          <span className="ml-4">Issuer: {certificate.issuedBy}</span>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
