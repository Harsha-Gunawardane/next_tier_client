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
		<Card bg={bg} {...rest} w="100%" p="5px">
			<Flex gap="8px">
				<Flex mb={{ base: "0px", "2xl": "20px" }} borderRadius={"10px"} w="5px" h={"auto"} bg={"danger"}></Flex>
				<Flex align="center" direction={{ base: "column", md: "row" }}>
					<Flex direction={"column"} py="10px">
						<Text fontWeight="500" color={textColorSecondary} fontSize="0.6rem" me="4px">
							{time}
						</Text>
						<Text color={textColorPrimary} fontWeight="500" fontSize="0.8rem" mb="4px">
							{title}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
