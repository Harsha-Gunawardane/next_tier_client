import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import Calender from "./Calender.";
import EventList from "./EventList";

const UpcommingClasses = (props) => {
	const { ...rest } = props;

	return (
		<Card h="340px" p="5px" {...rest}>
			<Flex h={"100%"}>
				<Flex p="0" borderRight="solid 1px" borderColor="gray.100" w="full" h="full" direction="column" alignItems="" justifyContent="flex-start">
					<Calender size={"xs"} />
				</Flex>
				<Flex w="full">
					<EventList />
				</Flex>
			</Flex>
		</Card>
	);
};

export default UpcommingClasses;
