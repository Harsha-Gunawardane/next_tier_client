import Chart from 'react-apexcharts';

function QuizMarkChart() {
  const xLabels = ['1 week', '2 week', '3 week', '4 week'];
  const yLabels = [0, 20, 40, 60, 80, 100];
  const data = [
    { x: '1 week', y: 45 },
    { x: '2 week', y: 65 },
    { x: '3 week', y: 75 },
    { x: '4 week', y: 75 },
  ];

  const options = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: xLabels,
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 6,
    },
  };

  const series = [
    {
      name: 'Percentage',
      data: data.map((point) => point.y),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="375"
      height={275}
    />
  );
}

export default QuizMarkChart;
