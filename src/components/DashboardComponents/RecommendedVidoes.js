import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import VideoList from "./VideoList";

const RecommendedVideos = ({ ...rest }) => {

	const videos = [
		{
			title: "Organic Chemistry - Part 1",
			tutor: "Prasanna Baddewithana",
			time: "2:30",
			viewcount: "1.2k",
			link: "/stu/content",
			image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
			uploadDateTime: "2023-07-01T10:00:00.000Z"
		},
		{
			title: "Industrial Chemistry - Introduction",
			tutor: "Prasanna Baddewithana",
			time: "2:30",
			viewcount: "1.2k",
			link: "/stu/content",
			image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
			uploadDateTime: "2023-05-01T10:00:00.000Z"
		},
		{
			title: "Trianganometry - Basics",
			tutor: "Ruwan Darshana",
			time: "2:30",
			viewcount: "1.2k",
			link: "/stu/content",
			image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
			uploadDateTime: "2023-01-01T10:00:00.000Z"
		},

	]

	return (
		<Card p="5px" overflowY="scroll" h={{ base: "max-content", md: "300px", lg: "350px" }} {...rest}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="5px" p={0} h={"100%"}>
				<GridItem colSpan={{ base: 1, md: 2, lg: 2 }} p={"10px"}>
					<VideoList videos={videos} />
				</GridItem>
			</SimpleGrid>
		</Card>
	);
};

export default RecommendedVideos;
