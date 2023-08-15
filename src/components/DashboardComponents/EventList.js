// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
import React from "react";
import Event from "./Event.js";

export default function EventList(props) {
	const { events } = props;

	const colorList = ["red", "orange", "green", "blue", "purple"];

	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" w="100%" p="10px" overflowY={"scroll"}>
			{events
				? events.map((event, index) => {
					// console.log(event);
					return <Event key={index} startTime={event.startTime} endTime={event.endTime} date={event.date} title={event.title} location={event.location} color={colorList[index % (colorList.length - 1)]} />
				})
				: console.log("No events")}
		</Flex>
	);
}
