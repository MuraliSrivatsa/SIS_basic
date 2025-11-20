import React from 'react';

export default function PageHeader({ title, subtitle, buttonText, onButtonClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {onButtonClick && (
        <button
          onClick={onButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          + {buttonText}
        </button>
      )}
    </div>
  );
}
