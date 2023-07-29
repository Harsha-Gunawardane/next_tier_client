import { Progress, Stack, Heading, Flex, Tooltip } from '@chakra-ui/react';
import ReactApexChart from 'react-apexcharts';

function Complain() {
  const progressStyle = {
    mx: 4,
    width: "230px",
  };

  const progress1 = {
    heading: 'Replied',
    value: 70,
    color: 'green', 
  };

  const progress2 = {
    heading: 'Pending',
    value: 20,
    color: 'yellow', 
  };

  const progress3 = {
    heading: 'Rejected',
    value: 10,
    color: 'red', 
  };
  const customColors = ['#3dad64', '#ebcf34', '#eb4034'];
  // Prepare data for the donut chart
  const chartData = {
    series: [progress1.value, progress2.value, progress3.value],
    options: {
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Overall',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%';
                },
              },
            },
          },
        },
      },
      labels: [progress1.heading, progress2.heading, progress3.heading],
      colors: customColors,
      legend: {
        show: false,
      },
    },
  };

  return (
    <div>
        {/* ApexCharts Donut Chart */}
        <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="300"
        align="center"
      />

      <Stack spacing={10} mt="15">
        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress1.heading}
          </Heading>
          <Tooltip label={`${progress1.value}%`} aria-label="progress1">
            <Progress
              colorScheme={progress1.color}
              size="md"
              value={progress1.value}
              style={progressStyle}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress2.heading}
          </Heading>
          <Tooltip label={`${progress2.value}%`} aria-label="progress2">
            <Progress
              colorScheme={progress2.color}
              size="md"
              value={progress2.value}
              style={progressStyle}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress3.heading}
          </Heading>
          <Tooltip label={`${progress3.value}%`} aria-label="progress3">
            <Progress
              colorScheme={progress3.color}
              size="md"
              value={progress3.value}
              style={progressStyle}
            />
          </Tooltip>
        </Flex>
      </Stack>
    </div>
  );
}

export default Complain;
