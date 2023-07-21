// Chakra imports
import { AspectRatio, Box, Flex, Icon, IconButton, Image, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";

export default function Event(props) {
	const { title, time, link, image, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "gray.400";
	const brandColor = useColorModeValue("brand.500", "white");
	const bg = useColorModeValue("white", "navy.700");
	// const image = "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
	return (
		<Flex bg={bg} {...rest} p="10px" w="100%">
			<Flex gap="8px" justifyContent={"space-between"} alignItems={"center"}>
				<Flex>
					<AspectRatio ratio={16 / 9} minW="200px" borderRadius="8px" bg={"gray.100"} me="20px">
						{/* //image with placeholder from online */}
						<Image src="https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="image" objectFit="cover" />
					</AspectRatio>
					<Flex align="center" direction={{ base: "row", md: "row" }}>
						<Box mt={{ base: "10px", md: "0" }}>
							<Text color={textColorPrimary} fontWeight="600" fontSize="1rem" mb="4px">
								{title}
							</Text>
							<Text fontWeight="600" color={textColorSecondary} fontSize="0.8rem" me="4px">
								{time}
							</Text>
						</Box>
					</Flex>
				</Flex>

			</Flex >
		</Flex>
	);
}
