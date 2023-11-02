import React from "react";
import ReactApexChart from "react-apexcharts";

class PaperColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {},
      chartData: [],
    };
  }

  componentDidMount() {
    this.setState({
      chartOptions: this.props.chartOptions,
      chartData: this.props.chartData,
    });
  }


  render() {
    return (
      <div className="column-chart">
        {console.log(this.props.chartData)}
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          width="100%"
          height="95%"
        />
      </div>
    );
  }
}

export default PaperColumnChart;
