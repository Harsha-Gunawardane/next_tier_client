import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./component/card";

const theme = {
	config: {
		intialColorMode: "light",
		useSystemColorMode: false,
	},

	styles: {
		global: {
			body: {
				margin: 0,
				"font-family": "'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
				"-webkit-font-smoothing": "antialiased",
				"-moz-osx-font-smoothing": "grayscale",
			},

			code: {
				"font-family": "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
			},
		},
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

		purple: "#800080",
		purpleFaded: "#c080c0",
	},
};

export default extendTheme(theme, CardComponent);
