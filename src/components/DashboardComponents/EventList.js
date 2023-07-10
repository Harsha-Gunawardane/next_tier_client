// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "../Card/Card";
import React from "react";
import Event from "./Event.js";

export default function EventList(props) {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "gray.400";
	const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px">
			<Event boxShadow={cardShadow} time="08:00 AM - 10:00 AM" link="#" title="Physics Theory" />
			<Event boxShadow={cardShadow} time="08:00 AM - 10:00 AM" link="#" title="chemistry" />
			<Event boxShadow={cardShadow} time="08:00 AM - 10:00 AM" link="#" title="Physics Paper Class" />
		</Flex>
	);
}
