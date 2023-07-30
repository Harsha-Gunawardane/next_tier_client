// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import React from "react";
import Video from "./Video";

export default function VideoList(props) {
	const { videos, thumbnailSize, gap = "5px", ...rest } = props;

	return (
		<Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap={gap} p="5px" w="100%">
			{videos.map((video, index) => (
				<Video
					key={index}
					thumbnailSize={thumbnailSize}
					{...video}
				/>
			))}
		</Flex>
	);
}
