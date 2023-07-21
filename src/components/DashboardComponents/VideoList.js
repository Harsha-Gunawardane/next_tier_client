// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "../Card/Card";
import React from "react";
import Video from "./Video";

export default function VideoList(props) {
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "gray.400";
	const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" overflow={"scroll"} p="5px">
			<Video time="2 Hours" link="#" title="Industrial Chemistry" />
			<Video time="2 Hours 30 Minutes" link="#" title="Chalaka Rasayanaya" />
			<Video time="1 Hour" link="#" title="Electronics" />
		</Flex>
	);
}
