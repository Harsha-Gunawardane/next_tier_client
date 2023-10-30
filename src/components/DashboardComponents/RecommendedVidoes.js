import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../Card/Card";
import VideoList from "./VideoList";

const RecommendedVideos = ({ content, ...rest }) => {

	const videos = [
		{
			title: "Organic Chemistry - Part 1",
			tutor: "Prasanna Baddewithana",
			time: "2:30",
			viewcount: "1.2k",
			link: "/stu/content",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-q1Fugx0DnDwZztgb9Kb_JQ-Mo91tNL3Pyg&usqp=CAU",
			uploadDateTime: "2023-07-01T10:00:00.000Z"
		},
		{
			title: "Industrial Chemistry - Introduction",
			tutor: "Prasanna Baddewithana",
			time: "2:30",
			viewcount: "1.2k",
			link: "/stu/content",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAL7__z7tTtDKfksudgKknl6YdXdkAASKnYw&usqp=CAU",
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
		<Card p="5px" h={{ base: "max-content", md: "300px", lg: "350px" }} {...rest}>
			<Box w="100%" h={"100%"} overflow={"auto"} >
				<VideoList videos={videos} content={content} />
			</Box>
		</Card>
	);
};

export default RecommendedVideos;
