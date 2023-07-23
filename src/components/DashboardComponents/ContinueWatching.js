// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

// Custom components
import Card from "../Card/Card";
import React from "react";


import CarouselMan from "./CarouselMan";

export default function ContinueWatching(props) {
	const { ...rest } = props;

	return (
		<Card id="continueWatching" justifyContent="center" align="center" alignItems="center" direction="column" w="100%" mb="0px" px="5px" h={{ base: "max-content", md: "300px", lg: "350px" }} {...rest}>
			<Flex as="top" w="100%" flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} justifyContent={"center"}>
				<CarouselMan />
			</Flex>
		</Card>
	);
}
