import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash,
} from 'react-icons/lu';

const SessionInfoCard = ({
  title,
  icon,
  date,
  type,
  hideDeleteBtn,
}) => {
  return ( 
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="text-xl text-blue-500">{icon}</div>
        <div>
          <h6 className="font-semibold">{title}</h6>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-xs text-gray-400">{type}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Trending icons example: choose based on some logic */}
        <LuTrendingUp className="text-green-500" size={18} />
        <LuTrendingDown className="text-red-500" size={18} />

        {/* Delete button */}
        {!hideDeleteBtn && (
          <button aria-label="Delete session">
            <LuTrash size={18} className="text-red-600 hover:text-red-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionInfoCard;
