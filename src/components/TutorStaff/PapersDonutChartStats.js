import React from "react";
import ReactApexChart from "react-apexcharts";

class PapersDonutChartStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [20, 32, 18, 15, 15],
      chartOptions: {
        labels: [
          "A: Excellent",
          "B: Good",
          "C: Satisfactory",
          "S: Pass",
          "F: Fail",
        ],
        colors: ["#0dbfe5", "#19fc56", "#05ec94", "#f9ad12", "#fc1454"],
        // Increase the font size of the labels
        dataLabels: {
          style: {
            fontSize: "14px", // Adjust the font size as needed
          },
        },
        
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    };
  }

  componentDidMount() {
    if (this.props.chartData && this.props.chartOptions) {
      this.setState({
        chartData: this.props.chartData,
        chartOptions: this.props.chartOptions,
      });
    }
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="donut"
        width="90%"
        height="80%"
      />
    );
  }
}

export default PapersDonutChartStats;
