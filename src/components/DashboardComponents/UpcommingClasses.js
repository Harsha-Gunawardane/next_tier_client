import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import Calender from "./Calender.";
import EventList from "./EventList";

const UpcommingClasses = () => {
	return (
		<Card h="calc(100% - 30px)">
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="5px" p={0} h={"100%"}>
				<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
					{/* <Calender w={"100%"} /> */}
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
					<EventList />
				</GridItem>
			</SimpleGrid>
		</Card>
	);
};

export default UpcommingClasses;
