// Chakra imports
import { AspectRatio, Box, Flex, Image, Text, useColorModeValue, Tag } from "@chakra-ui/react";
import generateTimeAgoString from "../../utils/timesAgo";


// Custom components
import React from "react";

export default function Video(props) {
	const { title, time, tutor, viewcount, link, image, uploadDateTime, thumbnailSize = { base: "170px", md: "180px", lg: "200px" }, ...rest } = props;

	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("#3f3f3f", "white");
	const textColorSecondary = "gray.500";
	const bg = useColorModeValue("white", "navy.700");
	// const image = "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
	return (
		<Flex bg={bg} {...rest} p="10px" w="100%">
			<Flex gap="8px" justifyContent={"space-between"} alignItems={"center"}>
				<Flex>
					<Box position={"relative"} h="max-content" w="max-content">
						<AspectRatio ratio={16 / 9} minW={{ base: thumbnailSize.base, md: thumbnailSize.md, lg: thumbnailSize.lg }} borderRadius="8px" bg={"gray.100"} >
							<Image src={image} alt="image" objectFit="cover" />
						</AspectRatio>
						<Tag
							position="absolute"
							bottom="5px"
							right="5px"
							bg="blackAlpha.800"
							color="white"
							fontSize="0.6em"
							p="5px"
							borderRadius="5px"
							opacity={"0.8"}
						>
							{time}
						</Tag>
					</Box>
					<Flex align="left" direction={"column"} gap={"3px"} justifyContent={"center"} ml={"20px"}>
						{/* <Box mt={{ base: "10px", md: "0" }}> */}
						<Text color={textColorPrimary} fontWeight="600" fontSize="1rem" noOfLines={2}>
							{title}
						</Text>
						<Text fontWeight="semi-bold" color={textColorSecondary} fontSize="0.9rem" noOfLines={1} >
							{tutor}
						</Text>
						<Text fontWeight="semi-bold" color={textColorSecondary} fontSize="0.8rem" noOfLines={1}>
							{/* keep empty space between */}
							{viewcount} Views • {generateTimeAgoString(uploadDateTime)}
						</Text>
						{/* </Box> */}
					</Flex>
				</Flex>

			</Flex >
		</Flex >
	);
}
