'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalysisChartProps {
  type: 'line' | 'pie';
  data: any;
  options?: any; // Changed to any to avoid Line/Pie conflict
  height?: string;
}

export default function AnalysisChart({ type, data, options, height = '300px' }: AnalysisChartProps) {
  const commonOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', font: { family: 'JetBrains Mono' } },
      },
    },
    scales: type === 'line' ? {
      y: { grid: { color: '#1a1a1a' }, ticks: { color: '#9ca3af' } },
      x: { grid: { color: '#1a1a1a' }, ticks: { color: '#9ca3af' } },
    } : {},
  };

  return (
    <div style={{ height }} className="relative w-full">
      {type === 'line' ? (
        <Line data={data} options={options || commonOptions} />
      ) : (
        <Pie data={data} options={options || commonOptions} />
      )}
    </div>
  );
}
