// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "../Card/Card";
import React, { useEffect } from "react";
import Event from "./Event.js";

export default function EventList(props) {
	const { events } = props;

	const colorList = ["red", "orange", "green", "blue", "purple"];

	useEffect(() => {
		console.log(events);
	}, []);


	// Chakra Color Mode
	// const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	// const textColorSecondary = "gray.400";
	// const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" w="100%" p="10px" overflowY={"scroll"}>
			{events
				? events.map((event, index) => {
					console.log(colorList);
					// colorList.map((color) => {
					return <Event key={index} startTime={event.startTime} endTime={event.endTime} date={event.date} title={event.title} location={event.location} color={colorList[index % (colorList.length - 1)]} />
					// })

				})
				: console.log("No events")}

			{/* <Event time="08:00 AM - 10:00 AM" link="#" title="Physics Theory" location="Hall1" color={"red"} />
			<Event time="08:00 AM - 10:00 AM" link="#" title="chemistry" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="Physics Paper Class" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="Physics Theory" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="chemistry" location="Hall1" />
			<Event time="08:00 AM - 10:00 AM" link="#" title="Physics Paper Class" location="Hall1" /> */}
		</Flex>
	);
}
