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
import CaptionCarousel from "./Carousel";

//imports
import { Heading, VStack, HStack, Tag } from "@chakra-ui/react";
import { capsFirst } from "../../utils";

export default function ContinueWatching(props) {
	const { ...rest } = props;

	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/")
			.then((res) => res.json())
			.then((res) => setData(res));
	}, []);

	// Chakra Color Mode

	const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
	const iconColor = useColorModeValue("accent", "white");
	const bgButton = useColorModeValue("gray.100", "whiteAlpha.100");
	const bgHover = useColorModeValue({ bg: "accent", color: "white" }, { bg: "whiteAlpha.50", color: "black" });
	const bgFocus = useColorModeValue({ bg: "white" }, { bg: "whiteAlpha.100" });
	return (
		<Card justifyContent="center" align="center" direction="column" w="100%" mb="0px" {...rest}>
			{/* <Flex justifyContent="space-between" w="100%">
				<Button bg={boxBg} fontSize="sm" fontWeight="500" color={textColorSecondary} borderRadius="7px" size={"xs"} mt={0} variant={"ghost"}>
					<Icon as={MdOutlineCalendarToday} color={textColorSecondary} />
					This month
				</Button>
				<Button align="center" justifyContent="center" color={iconColor} bg={bgButton} _hover={bgHover} w="37px" h="37px" lineHeight="100%" borderRadius="10px" size={"xs"} mt={0}>
					<Icon as={MdBarChart} w="24px" h="24px" />
				</Button>
			</Flex> */}
			<Flex as="top" w="100%" flexDirection={{ base: "column", lg: "row" }}>
				<CaptionCarousel></CaptionCarousel>
			</Flex>
		</Card>
	);
}
