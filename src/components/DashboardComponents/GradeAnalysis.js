// Chakra imports
import { Box, Button, Flex, Icon, useColorModeValue, Select } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import LineChart from "../charts/LineChart";
import React from "react";
// Assets
import { lineChartDataGrades, lineChartOptionsGrades } from "./data";
import { FiCalendar } from "react-icons/fi";
import { MdBarChart } from "react-icons/md";

export default function GradeAnalysis(props) {
	const { ...rest } = props;

	const iconColor = useColorModeValue("accent", "white");
	const bgButton = useColorModeValue("gray.100", "whiteAlpha.100");
	const bgHover = useColorModeValue({ bg: "accent", color: "white" }, { bg: "whiteAlpha.50", color: "black" });

	return (
		<Card justifyContent="center" align="center" direction="column" w="100%" mb="0px" {...rest} p="10px" h="340px">
			<Flex justifyContent="space-between" w="100%" px={"10px"}>
				<Select variant={"outline"} icon={<FiCalendar />} w={"max-content"}>
					<option value='option2'>Monthly</option>
					<option value='option1'>Weekly</option>
				</Select>
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
