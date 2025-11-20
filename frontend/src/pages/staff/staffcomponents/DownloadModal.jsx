import React from 'react';

export default function DownloadModal({ isOpen, onClose, onDownload }) {
  if (!isOpen) return null;

  const handleDownload = (type) => {
    onDownload(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Download Format</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleDownload('pdf')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            PDF
          </button>
          <button
            onClick={() => handleDownload('word')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Word
          </button>
          <button
            onClick={() => handleDownload('txt')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            TXT
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
