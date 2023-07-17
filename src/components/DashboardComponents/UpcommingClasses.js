import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import EventList from "./EventList";
import Calender from "./Calender";

const UpcommingClasses = (props) => {
	const { ...rest } = props;

	// <Event time={event.time} link={event.link} title={event.title} location={event.location}

	const eventList = [
		{ time: "08:00 AM - 10:00 AM", link: "#", title: "Physics Theory", location: "Hall1" },
		{ time: "08:00 AM - 10:00 AM", link: "#", title: "chemistry", location: "Hall1" },
		{ time: "08:00 AM - 10:00 AM", link: "#", title: "Physics Paper Class", location: "Hall1" },
		{ time: "08:00 AM - 10:00 AM", link: "#", title: "Physics Theory", location: "Hall1" },
	];

	return (
		<Card h={{ base: "680px", lg: "340px" }} p="5px" {...rest} >
			<Flex h={"100%"} direction={{ base: "column", lg: "row" }} >
				<Flex p="0" borderRight={{ base: "none", lg: "solid 1px" }} borderBottom={{ base: "solid 1px", lg: "none" }} borderColor={{ base: "gray.100", lg: "gray.100" }} w={{ base: "100%", lg: "50%" }} h="full" direction={"column"} alignItems="center" justifyContent="center">
					<Calender />
				</Flex>
				<Flex w={{ base: "100%", lg: "50%" }} overflow={"hidden"}>
					<EventList events={eventList} />
				</Flex>
			</Flex>
		</Card>
	);
};

export default UpcommingClasses;
