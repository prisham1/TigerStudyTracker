// StudyNotes.jsx
import React from 'react';

const StudyNotes = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="card p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
        <h5 className="text-lg font-semibold mb-4">Study Notes (Last 7 Days)</h5>
        <p className="text-gray-500 text-sm">No notes recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="card mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
      <h5 className="text-lg font-semibold mb-4">Study Notes (Last 7 Days)</h5>
      <ul className="space-y-3">
        {logs.map((log) => (
          <li
            key={log._id}
            className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-700">{log.location}</span>
              <span className="text-xs text-gray-400">
                {new Date(log.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 italic">{log.notes}</p>
            <div className="mt-2 flex gap-2">
              {log.productivity >= 8 && (
                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                  High Productivity
                </span>
              )}
              {log.productivity <= 4 && (
                <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                  Low Productivity
                </span>
              )}
              {log.productivity > 4 && log.productivity < 8 && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                  Medium Productivity
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyNotes;

