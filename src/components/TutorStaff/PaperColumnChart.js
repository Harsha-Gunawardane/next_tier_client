import React from "react";
import ReactApexChart from "react-apexcharts";

class PaperColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "bar",
        },
        colors: ["#0dbfe5", "#19fc56", "#05ec94", "#f9ad12", "#fc1454"],
      
        plotOptions: {
          bar: {
            columnWidth: "40%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "A: Excellent",
            "B: Good",
            "C: Satisfactory",
            "S: Pass",
            "F: Fail",
          ],
          labels: {
            style: {
              colors: ["#0dbfe5", "#19fc56", "#05ec94", "#f9ad12", "#fc1454"],

              fontSize: "12px",
            },
          },
        },
      },
      series: [
        {
          name: "No.of Students",
          data: [30, 40, 45, 50, 49],
        },
      ],
    };
  }

  render() {
    return (
      <div className="column-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="100%"
          height="95%"
        />
      </div>
    );
  }
}

export default PaperColumnChart;
