import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData,index }) {
  return <Bar height={730} width={10}
  options={{ maintainAspectRatio: false,scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }

  }, indexAxis: index }} data={chartData} />;
}

export default BarChart;