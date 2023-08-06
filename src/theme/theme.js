import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./component/card";
import "@fontsource/roboto";
import "@fontsource/poppins";

const theme = {
	config: {
		intialColorMode: "light",
		useSystemColorMode: false,
	},

	fonts: {
		heading: `'Roboto',sans-serif`,
		body: `'Roboto',sans-serif`,
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
				fontFamily: `'Roboto',sans-serif`,
			},
			body: {
				margin: 0,
				fontFamily: `'Roboto',sans-serif`,
				"-webkit-font-smoothing": "antialiased",
				"-moz-osx-font-smoothing": "grayscale",
			},

			heading: {
				fontFamily: `'Roboto',sans-serif`,
			},

			code: {
				fontFamily: `'Roboto',sans-serif`,
			},

			"&::-webkit-scrollbar": {
				width: "8px",
				height: "0.7rem",
				zIndex: "1000",
			},
			"&::-webkit-scrollbar-track": {
				bg: "white",
			},
			"&::-webkit-scrollbar-thumb": {
				bg: "#b8b8b8",
				borderRadius: "1.4rem",
			},
			"&::-webkit-scrollbar-thumb:hover": {
				bg: "#929292",
			},
			"&::-moz-scrollbar": {
				width: "8px",
				height: "0.7rem",
				zIndex: "1000",
			},
			"&::-moz-scrollbar-track": {
				bg: "white",
			},
		},
	},
};

export default extendTheme(theme, CardComponent);
