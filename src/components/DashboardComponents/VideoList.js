// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import React from "react";
import Video from "./Video";

export default function VideoList(props) {
	const { videos, ...rest } = props;

	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" overflow={"scroll"} p="5px">
			{videos.map((video, index) => (
				<Video key={index} title={video.title} tutor={video.tutor} time={video.time} link={video.link} image={video.image} viewcount={video.viewcount} uploadDateTime={video.uploadDateTime} />
			))}
		</Flex>
	);
}
