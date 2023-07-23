import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./component/card";

const theme = {
	config: {
		intialColorMode: "light",
		useSystemColorMode: false,
	},

	fonts: {
		heading: '"Roboto"',
		body: '"Roboto"',
	},

	colors: {
		primary: "#FFF",
		secondary: "#DCE1EB",
		accent: "#0074D9",
		accentFaded: "#99c7f0",
		danger: "#ff7782",
		dangerFaded: "#ffadb4",
		success: "#41f1b6",
		successFaded: "#8df7d3",
		warning: "#ffbb55",
		warningFaded: "#ffd699",

	},

	styles: {
		global: {
			html: {
				fontFamily: "'Roboto'",
			},
			body: {
				margin: 0,
				fontFamily: "'Roboto',sans-serif",
				"-webkit-font-smoothing": "antialiased",
				"-moz-osx-font-smoothing": "grayscale",
			},

			heading: {
				fontFamily: "'Roboto',sans-serif",
			},

			code: {
				fontFamily: "'Roboto',sans-serif",
			},
		},
	},
};

export default extendTheme(theme, CardComponent);
