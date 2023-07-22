import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  // Sample data for the chart
  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May'],
        title: {
          text: 'Months of the Year',
        },
      },
      yaxis: {
        min: 0,
        max: 1000,
        tickAmount:5,
        title: {
          text: 'Number of Students',
        },
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [800, 750, 600, 825, 875],
      },
    ],
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={180}
      />
    </div>
  );
};

export default LineChart;
