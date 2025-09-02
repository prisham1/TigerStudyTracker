import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomPieChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer width={180} height={180}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
