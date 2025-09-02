import React from 'react';
import CustomPieChart from "../../components/Charts/CustomPieChart"
import CustomLegend from "../../components/Charts/CustomLegend"

const COLORS = ['#A3B18A', '#588157']; // Choose your aesthetic colors

const AcademicOverview = ({
  totalStudiedHours,
  totalSessions,
  averageProductivity,
  mostProductiveLocation
}) => {
  const studyGoal = 40; // Arbitrary goal, e.g., weekly or custom
  const remainingHours = Math.max(studyGoal - totalStudiedHours, 0);

  const studyData = [
    { name: 'Studied Hours', value: totalStudiedHours },
    { name: 'Remaining Hours to Goal (40 hrs)', value: remainingHours }
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Academic Overview</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <CustomPieChart data={studyData} colors={COLORS} />
        <div className="flex flex-col gap-3">
          <CustomLegend data={studyData} colors={COLORS} />
          <p className="text-sm text-gray-600">
            Total Sessions: <span className="font-medium">{totalSessions}</span>
          </p>
          <p className="text-sm text-gray-600">
            Avg. Productivity: <span className="font-medium">{averageProductivity}</span>
          </p>
          <p className="text-sm text-gray-600">
            Top Location: <span className="font-medium">{mostProductiveLocation}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicOverview;
