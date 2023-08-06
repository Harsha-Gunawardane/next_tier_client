import React from "react";
import ReactApexChart from "react-apexcharts";

class DonutChartCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [55, 41],
      chartOptions: {
        labels: ["Medium", "Hard"],
        colors: ["#05ec94", "#fc1454"], // Add your desired colors here
      },
    };
  }

  componentDidMount() {
    // If you want to allow the chart data and options to be updated externally, you can keep this part.
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
        width="100%"
        height="100%"
      />
    );
  }
}

export default DonutChartCategory;
