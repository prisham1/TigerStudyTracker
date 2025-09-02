import React from 'react';
import { LuArrowRight, LuTrendingUp, LuTrendingDown, LuUtensils } from 'react-icons/lu';
import moment from 'moment';
import SessionInfoCard from '../../components/Cards/SessionInfoCard';

const getProductivityTrendIcon = (currentProd, prevProd) => {
  if (prevProd === undefined) {
    // No previous session, show neutral icon
    return <LuUtensils className="text-yellow-500" />;
  }
  if (currentProd > prevProd) {
    return <LuTrendingUp className="text-green-500" />;
  }
  if (currentProd < prevProd) {
    return <LuTrendingDown className="text-red-500" />;
  }
  // Equal productivity, neutral icon
  return <LuUtensils className="text-yellow-500" />;
};

const RecentSessions = ({ sessions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">View Recent Study Sessions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {sessions?.slice(0, 5).map((item, idx) => {
          const prevProd = idx > 0 ? sessions[idx - 1].productivity : undefined;
          const icon = getProductivityTrendIcon(item.productivity, prevProd);

          return (
            <SessionInfoCard
              key={item._id}
              title={item.location}
              icon={icon}
              date={moment(item.timestamp).format('Do MMMM YYYY')}
              type={`Duration: ${item.duration} mins, Productivity: ${item.productivity}`}
              hideDeleteBtn={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentSessions;
