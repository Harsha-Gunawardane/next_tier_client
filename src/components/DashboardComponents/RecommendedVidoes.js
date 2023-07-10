import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import Calender from "./Calender.";
// import EventList from "./List";

const RecommendedVideos = () => {
	return (
		<Card h="calc(100% - 30px)">
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="5px" p={0} h={"100%"}>
				<GridItem colSpan={{ base: 1, md: 2, lg: 2 }} bg={"gray.50"} p={"10px"}>
					{/* <VideoList /> */}
				</GridItem>
			</SimpleGrid>
		</Card>
	);
};

export default RecommendedVideos;
