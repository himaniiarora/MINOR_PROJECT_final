import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PerformanceChart = ({ type, data }) => (
  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h3 className="font-semibold text-lg mb-2">{type} Performance</h3>
    <Line data={data} />
  </div>
);

export default PerformanceChart;
