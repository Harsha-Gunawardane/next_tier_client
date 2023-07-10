import { mode } from "@chakra-ui/theme-tools";

const Card = {
	baseStyle: (props) => ({
		p: "20px",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		position: "relative",
		borderRadius: "8px",
		minWidth: "0px",
		wordWrap: "break-word",
		bg: "primary",
		backgroundClip: "border-box",
		boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",

		_hover: {
			boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
		},
	}),
};

export const CardComponent = {
	components: {
		Card,
	},
};
