// Total Spent Default

export const lineChartDataGrades = [
	{
		name: "Physics",
		data: [50, 64, 48, 66, 49, 68, 60, 70, 80],
	},
	{
		name: "Chemistry",
		data: [30, 40, 24, 46, 20, 46, 30, 40, 50],
	},
];

export const lineChartOptionsGrades = {
	chart: {
		toolbar: {
			show: false,
		},
		dropShadow: {
			enabled: true,
			top: 13,
			left: 0,
			blur: 10,
			opacity: 0.1,
			color: "#4318FF",
		},
		animations: {
			enabled: true,
			easing: "easeinout",
			speed: 800,
			animateGradually: {
				enabled: true,
				delay: 150,
			},
			dynamicAnimation: {
				enabled: true,
				speed: 350,
			},
		},
	},
	colors: ["#4318FF", "#39B8FF"],
	markers: {
		size: 0,
		colors: "white",
		strokeColors: "#7551FF",
		strokeWidth: 3,
		strokeOpacity: 0.9,
		strokeDashArray: 0,
		fillOpacity: 1,
		discrete: [],
		shape: "circle",
		radius: 2,
		offsetX: 0,
		offsetY: 0,
		showNullDataPoints: true,
	},
	tooltip: {
		theme: "dark",
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
		type: "line",
	},
	xaxis: {
		type: "numeric",
		categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"],
		labels: {
			style: {
				colors: "#A3AED0",
				fontSize: "12px",
				fontWeight: "500",
			},
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	yaxis: {
		show: true,
		labels: {
			style: {
				colors: "#A3AED0",
				fontSize: "12px",
				fontWeight: "500",
			},
		},

		grid: {
			show: false,
			column: {
				color: ["#7551FF", "#39B8FF"],
				opacity: 0.5,
			},
		},
		color: ["#7551FF", "#39B8FF"],
	},
	legend: {
		show: true,
		position: "top",
		horizontalAlign: "left",
	},
};
