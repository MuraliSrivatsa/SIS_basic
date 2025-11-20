import React, { useState } from 'react';
import DownloadModal from './DownloadModal';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function AssignmentCard({ assignment, onUpdate, onDelete, onView }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const handleDownload = (type) => {
    if (type === 'pdf') generatePDF(assignment);
    if (type === 'word') generateWord(assignment);
    if (type === 'txt') generateTXT(assignment);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(data.title, 10, 20);
    doc.setFontSize(12);
    doc.text(`Course: ${data.course}`, 10, 30);
    doc.text(`Teacher: ${data.teacher}`, 10, 40);
    doc.text(`Type: ${data.type}`, 10, 50);
    doc.text(`Due: ${data.dueDate}`, 10, 60);
    doc.text(`Points: ${data.maxPoints}`, 10, 70);
    doc.text(`Submissions: ${data.submissions}`, 10, 80);
    doc.text('Description:', 10, 90);
    doc.text(data.description, 10, 100, { maxWidth: 180 });
    doc.save(`${data.title}.pdf`);
  };

  const generateWord = async (data) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ children: [new TextRun({ text: data.title, bold: true, size: 32 })] }),
            new Paragraph({ text: `Course: ${data.course}` }),
            new Paragraph({ text: `Teacher: ${data.teacher}` }),
            new Paragraph({ text: `Type: ${data.type}` }),
            new Paragraph({ text: `Due: ${data.dueDate}` }),
            new Paragraph({ text: `Points: ${data.maxPoints}` }),
            new Paragraph({ text: `Submissions: ${data.submissions}` }),
            new Paragraph({ text: 'Description:' }),
            new Paragraph({ text: data.description }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.title}.docx`);
  };

  const generateTXT = (data) => {
    const txtContent = `
Title: ${data.title}
Course: ${data.course}
Teacher: ${data.teacher}
Type: ${data.type}
Due Date: ${data.dueDate}
Points: ${data.maxPoints}
Submissions: ${data.submissions}

Description:
${data.description}
    `;
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${data.title}.txt`);
  };

  const {
    title,
    course,
    teacher,
    type,
    status,
    description,
    dueDate,
    maxPoints,
    submissions,
    progress,
    grade,
    feedback,
  } = assignment;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
      {/* Assignment Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">📊</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{course} • {teacher}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">{type}</span>
          {status === 'Overdue' && (
            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md font-medium">{status}</span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{description}</p>

      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">📅 <span>Due: {dueDate}</span></div>
        <div className="flex items-center gap-1">🏆 <span>Max Points: {maxPoints}</span></div>
        <div className="flex items-center gap-1">👥 <span>Submissions: {submissions}</span></div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {grade && (
        <div className="mb-4">
          <span className="text-sm text-gray-600">Grade: </span>
          <span className="text-green-600 font-semibold">{grade}</span>
        </div>
      )}

      {feedback && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
          <p className="text-sm">
            <span className="font-medium text-blue-800">Teacher Feedback:</span>
            <span className="text-blue-700"> {feedback}</span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={onView}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            👁 View Details
          </button>
          <button
            onClick={() => setIsDownloadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            ⬇ Download
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onUpdate}
            className="px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50"
          >
            ✏ Update
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 border border-red-600 rounded-md text-red-600 hover:bg-red-50"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onDownload={handleDownload}
      />
    </div>
  );
}
