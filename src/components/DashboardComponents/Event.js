// Chakra imports
import { Box, Flex, Icon, Image, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import React from "react";
// Assets
import { MdEdit } from "react-icons/md";

export default function Event(props) {
	const { title, time, link, image, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
	const textColorSecondary = "gray.400";
	const brandColor = useColorModeValue("brand.500", "white");
	const bg = useColorModeValue("white", "navy.700");
	return (
		<Card bg={bg} {...rest}>
			<Flex gap="8px">
				<Flex mb={{ base: "0px", "2xl": "20px" }} borderRadius={"10px"} w="6px" h={"auto"} bg={"danger"}></Flex>
				<Flex align="center" direction={{ base: "column", md: "row" }}>
					<Box mt={{ base: "10px", md: "0" }}>
						<Text fontWeight="500" color={textColorSecondary} fontSize="0.5rem" me="4px">
							{time}
						</Text>
						<Text color={textColorPrimary} fontWeight="500" fontSize="0.6rem" mb="4px">
							{title}
						</Text>
					</Box>
				</Flex>
			</Flex>
		</Card>
	);
}
