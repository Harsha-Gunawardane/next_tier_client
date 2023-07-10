import React, { useState } from "react";
import { CSSReset, Flex } from "@chakra-ui/react";
import { Calendar } from "react-calendar";

const Calender = ({ ...rest }) => {
	return (
		<Flex>
			<Calendar fontSize="0.5rem"></Calendar>
		</Flex>
	);
};

export default Calender;
