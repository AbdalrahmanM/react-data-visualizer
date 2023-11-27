import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CHART_COLORS = {
  EVEN: '#3498db',
  ODD: '#e74c3c',
};

const BAR_WIDTH = 50;
const BAR_MARGIN = 10;

const BarChart = ({ data, numChannels }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const datasets = Array.from({ length: numChannels }, (_, i) => ({
      label: `Channel ${i + 1}`,
      backgroundColor: i % 2 === 0 ? CHART_COLORS.EVEN : CHART_COLORS.ODD,
      borderColor: 'white',
      borderWidth: 2,
      data: data.map((item) => item[`channel${i + 1}`]),
    }));

    const chartData = {
      labels: Array.from({ length: data.length }, (_, i) => `Bar ${i + 1}`),
      datasets,
    };

    const options = {
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
          max: 10, 
        },
      },
    };

    let chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, numChannels]);

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <h2 className='text-2xl font-semibold mb-4'>Bar Chart</h2>
      <canvas
        ref={chartRef}
        width={BAR_WIDTH * data.length + BAR_MARGIN * (data.length - 1)}
        height={300} 
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default BarChart;
