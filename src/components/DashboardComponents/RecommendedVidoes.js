import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import VideoList from "./VideoList";

const RecommendedVideos = ({ ...rest }) => {
	return (
		<Card h="300px" p="5px" overflowY="scroll" {...rest}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="5px" p={0} h={"100%"}>
				<GridItem colSpan={{ base: 1, md: 2, lg: 2 }} p={"10px"}>
					<VideoList />
				</GridItem>
			</SimpleGrid>
		</Card>
	);
};

export default RecommendedVideos;
