'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  CHANNEL_SALES_SPLIT,
  WEEKLY_TRAFFIC_SOURCES,
  PROMOTION_IMPACTS,
} from '@/data/mockData';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Common font styling matching the Space Mono / Schibsted Grotesk aesthetic
const baseFont = {
  family: "'Space Mono', ui-monospace, monospace",
  size: 11,
};

/**
 * 1. Channel Sales Mix Doughnut Chart
 */
export const ChannelMixDoughnut: React.FC = () => {
  const data = {
    labels: CHANNEL_SALES_SPLIT.map((c) => c.label),
    datasets: [
      {
        data: CHANNEL_SALES_SPLIT.map((c) => c.revenue),
        backgroundColor: [
          '#1E1B18', // In-Store (Deep Charcoal)
          '#D95D39', // Online Aggregators (Burnt Terracotta)
          '#15803D', // Direct Website & QR (Leaf Green)
        ],
        borderColor: ['#FAF8F5', '#FAF8F5', '#FAF8F5'],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: baseFont,
          boxWidth: 12,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#1E1B18',
        titleFont: baseFont,
        bodyFont: baseFont,
        padding: 12,
        cornerRadius: 4,
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw as number;
            const percentage = CHANNEL_SALES_SPLIT[ctx.dataIndex]?.percentage || 0;
            return ` ₹ ${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-[10px] font-mono text-ink-secondary uppercase">Gross</span>
        <span className="text-base font-bold font-mono text-ink">₹ 42,850</span>
      </div>
    </div>
  );
};

/**
 * 2. Weekly Orders & Revenue Dual-Axis Chart
 */
export const WeeklyTrafficChart: React.FC = () => {
  const labels = WEEKLY_TRAFFIC_SOURCES.map((d) => d.day);
  const orderCounts = WEEKLY_TRAFFIC_SOURCES.map((d) => d.totalOrders);
  const revenueAmounts = WEEKLY_TRAFFIC_SOURCES.map((d) => d.revenue);

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Gross Revenue (₹)',
        data: revenueAmounts,
        borderColor: '#D95D39',
        backgroundColor: 'rgba(217, 93, 57, 0.08)',
        borderWidth: 2.5,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#D95D39',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: 'Order Volume',
        data: orderCounts,
        backgroundColor: '#1E1B18',
        borderRadius: 4,
        barThickness: 22,
        yAxisID: 'y',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: baseFont,
          boxWidth: 12,
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1E1B18',
        titleFont: baseFont,
        bodyFont: baseFont,
        padding: 12,
        cornerRadius: 4,
        callbacks: {
          label: (ctx) => {
            if (ctx.dataset.yAxisID === 'y1') {
              const val = ctx.raw as number;
              return ` Revenue: ₹ ${val.toLocaleString('en-IN')}`;
            }
            return ` Orders: ${ctx.raw} tickets`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: baseFont,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: baseFont,
        },
        title: {
          display: true,
          text: 'Orders',
          font: baseFont,
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          font: baseFont,
          callback: (value) => `₹ ${Number(value) / 1000}k`,
        },
        title: {
          display: true,
          text: 'Revenue',
          font: baseFont,
        },
      },
    },
  };

  return (
    <div className="w-full h-[280px]">
      <Bar data={data as any} options={options} />
    </div>
  );
};

/**
 * 3. Promotion Cost vs Revenue ROI Chart
 */
export const PromotionRoiChart: React.FC = () => {
  const data = {
    labels: PROMOTION_IMPACTS.map((p) => p.name),
    datasets: [
      {
        label: 'Discount Spent (₹)',
        data: PROMOTION_IMPACTS.map((p) => p.discountSpent),
        backgroundColor: '#BE123C', // Ruby red
        borderRadius: 4,
      },
      {
        label: 'Revenue Produced (₹)',
        data: PROMOTION_IMPACTS.map((p) => p.revenueGenerated),
        backgroundColor: '#15803D', // Leaf green
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: baseFont,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1E1B18',
        titleFont: baseFont,
        bodyFont: baseFont,
        padding: 12,
        cornerRadius: 4,
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw as number;
            return ` ${ctx.dataset.label}: ₹ ${val.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: baseFont },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          font: baseFont,
          callback: (val) => `₹ ${val}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-[240px]">
      <Bar data={data} options={options} />
    </div>
  );
};

/**
 * 4. Hourly Kitchen Prep Speed & Velocity Chart
 */
export const HourlyKitchenVelocityChart: React.FC = () => {
  const hours = ['11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];
  const paceMinutes = [6.5, 9.2, 11.4, 9.8, 6.0, 5.5, 6.8, 8.4, 12.1, 13.5, 10.2, 7.0];
  const orderLoad = [4, 12, 22, 16, 5, 4, 8, 14, 26, 31, 18, 9];

  const data = {
    labels: hours,
    datasets: [
      {
        type: 'line' as const,
        label: 'Avg Prep Pace (Mins)',
        data: paceMinutes,
        borderColor: '#E5A93C', // Amber
        backgroundColor: 'rgba(229, 169, 60, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
        pointRadius: 3,
      },
      {
        type: 'bar' as const,
        label: 'Order Velocity (Tickets/hr)',
        data: orderLoad,
        backgroundColor: 'rgba(30, 27, 24, 0.75)',
        borderRadius: 3,
        barThickness: 14,
        yAxisID: 'y',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { font: baseFont, boxWidth: 10 },
      },
      tooltip: {
        backgroundColor: '#1E1B18',
        titleFont: baseFont,
        bodyFont: baseFont,
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: baseFont } },
      y: {
        type: 'linear',
        position: 'left',
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: baseFont },
        title: { display: true, text: 'Tickets/hr', font: baseFont },
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: { display: false },
        ticks: {
          font: baseFont,
          callback: (v) => `${v}m`,
        },
        title: { display: true, text: 'Prep Speed', font: baseFont },
      },
    },
  };

  return (
    <div className="w-full h-[220px]">
      <Bar data={data as any} options={options} />
    </div>
  );
};
