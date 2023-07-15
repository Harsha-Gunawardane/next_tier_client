// Chakra imports
import { Box, Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import LineChart from "../charts/LineChart";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { lineChartDataGrades, lineChartOptionsGrades } from "./data";

export default function GradeAnalysis(props) {
	const { ...rest } = props;

	// Chakra Color Mode

	const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
	const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
	const iconColor = useColorModeValue("accent", "white");
	const bgButton = useColorModeValue("gray.100", "whiteAlpha.100");
	const bgHover = useColorModeValue({ bg: "accent", color: "white" }, { bg: "whiteAlpha.50", color: "black" });
	const bgFocus = useColorModeValue({ bg: "white" }, { bg: "whiteAlpha.100" });
	return (
		<Card justifyContent="center" align="center" direction="column" w="100%" mb="0px" {...rest} p="10px" h="340px">
			<Flex justifyContent="space-between" w="100%">
				<Button bg={boxBg} fontSize="sm" fontWeight="500" color={textColorSecondary} borderRadius="7px" size={"xs"} mt={0} variant={"ghost"}>
					<Icon as={MdOutlineCalendarToday} color={textColorSecondary} />
					This month
				</Button>
				<Button align="center" justifyContent="center" color={iconColor} bg={bgButton} _hover={bgHover} w="37px" h="37px" lineHeight="100%" borderRadius="10px" size={"xs"} mt={0}>
					<Icon as={MdBarChart} w="24px" h="24px" />
				</Button>
			</Flex>
			<Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
				<Box minH="260px" minW="100%" mt="auto">
					<LineChart chartData={lineChartDataGrades} chartOptions={lineChartOptionsGrades} />
				</Box>
			</Flex>
		</Card>
	);
}
