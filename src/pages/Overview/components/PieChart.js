import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return <Pie height={280}  width={80}
  options={{ maintainAspectRatio: false, responsive:true }} data={chartData} />;
}

export default PieChart;