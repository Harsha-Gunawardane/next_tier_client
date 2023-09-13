import React from "react";
import ReactApexChart from "react-apexcharts";

function QuizAnalysisChart() {
  const series = [
    {
      name: "Prev quizzes",
      group: "budget",
      data: [44, 32, 20],
    },
    {
      name: "New quizzes",
      group: "budget",
      data: [8, 10, 5],
    },
    {
      name: "Prev questions",
      group: "actual",
      data: [128, 152, 120],
    },
    {
      name: "New questions",
      group: "actual",
      data: [20, 40, 25],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },

    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Physics", "Chemistry", "Maths"],
    },
    fill: {
      opacity: 1,
    },
    colors: ["#00E396", "#80f1cb", "#008FFB", "#80c7fd"], // Reorder colors if needed

    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type={"bar"}
      height={350}
    />
  );
}

export default QuizAnalysisChart;
