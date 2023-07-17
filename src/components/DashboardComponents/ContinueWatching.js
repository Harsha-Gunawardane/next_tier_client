// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Custom components
import Card from "../Card/Card";
import LineChart from "../charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";

// Assets
import { lineChartDataGrades, lineChartOptionsGrades } from "./data";
import Carousel from "./Carousel";

//imports
import { Heading, VStack, HStack, Tag } from "@chakra-ui/react";
import { capsFirst } from "../../utils";

export default function ContinueWatching(props) {
	const { ...rest } = props;

	const [data, setData] = useState([]);


	// Chakra Color Mode

	const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
	const iconColor = useColorModeValue("accent", "white");
	const bgButton = useColorModeValue("gray.100", "whiteAlpha.100");
	const bgHover = useColorModeValue({ bg: "accent", color: "white" }, { bg: "whiteAlpha.50", color: "black" });
	const bgFocus = useColorModeValue({ bg: "white" }, { bg: "whiteAlpha.100" });
	return (
		<Card justifyContent="center" align="center" alignItems="center" direction="column" w="100%" mb="0px" px="5px" h="300px" {...rest}>
			<Flex as="top" w="100%" flexDirection={{ base: "column", lg: "row" }} alignItems={"center"} justifyContent={"center"}>
				<Carousel />
			</Flex>
		</Card>
	);
}
