// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "../Card/Card";
import React from "react";
import Event from "./Event.js";

export default function EventList(props) {
	const { events } = props;

	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "gray.400";
	const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" w="100%" p="10px" overflowY={"scroll"}>
			{events
				? events.map((event) => {
						return <Event time={event.time} link={event.link} title={event.title} location={event.location} />;
				  })
				: console.log("No events")}

			<Event time="08:00 AM - 10:00 AM" link="#" title="Physics Theory" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="chemistry" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="Physics Paper Class" location="Hall1" />
		</Flex>
	);
}
