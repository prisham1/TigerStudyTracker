import React from "react"; 

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md text-black ${color} flex items-center space-x-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-2xl">{value}</div>
      </div>
    </div>
  );
};

export default InfoCard; 