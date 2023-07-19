import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
  // Sample data for the chart
  const chartData = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May'],
        title: {
          text: 'Months of the Year',
        },
      },
      yaxis: {
        min:0,
        max: 200000,
        tickAmount: 5,
        title: {
          text: 'Income',
        },
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [90000, 50000, 150000, 120000, 80000],
      },
    ],
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={220}
      />
    </div>
  );
};

export default BarChart;
