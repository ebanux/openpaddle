import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { DailyTransactionMetrics } from '../../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface RevenueChartProps {
  data: DailyTransactionMetrics[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(d => d.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value: any) {
                    return '$' + value;
                }
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    }
  };

  return <Line options={options} data={chartData} />;
};

export default RevenueChart;