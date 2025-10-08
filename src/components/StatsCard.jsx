import React from "react";

function StatsCard({ title, value, icon }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StatsCard;
