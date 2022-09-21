import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar height={60} width={20}
  options={{ maintainAspectRatio: false }} data={chartData} />;
}

export default BarChart;