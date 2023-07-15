import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import Calender from "./Calender.";
import EventList from "./EventList";

const UpcommingClasses = () => {
	return (
		<Card h="calc(100% - 30px)" p="5px">
			<Flex h={"max-content"}>
				<Flex p="0" borderRight="solid 1px" borderColor="gray.100" w="full" h="full" direction="column" alignItems="center" justifyContent="center">
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
