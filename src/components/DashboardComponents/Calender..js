import React, { useState } from "react";
import { CSSReset, Flex } from "@chakra-ui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";

const Calender = ({ ...rest }) => {
	const handleSelect = (date) => {
		console.log(date); // native Date object
	};

	return <Calendar date={new Date()} onChange={handleSelect} />;
};

export default Calender;
