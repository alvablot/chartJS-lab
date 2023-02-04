import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
export const BarChart = ({ chartData, headline }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: headline
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};