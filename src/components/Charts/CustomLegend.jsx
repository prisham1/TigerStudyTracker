import React from 'react';

const CustomLegend = ({ data, colors }) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span>{entry.name}: </span>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
