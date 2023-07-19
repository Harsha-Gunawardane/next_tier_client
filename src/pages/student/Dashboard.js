import { Box, Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Avatar, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

import MiniStat from "../../components/Card/MiniStat";

import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";

import IconBox from "../../components/icons/IconBox";
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";

//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import GradeAnalysis from "../../components/DashboardComponents/GradeAnalysis";
import UpcommingClasses from "../../components/DashboardComponents/UpcommingClasses";
import ContinueWatching from "../../components/DashboardComponents/ContinueWatching";
import RecommendedVideos from "../../components/DashboardComponents/RecommendedVidoes";
import MiniStatCardIcon from "../../components/icons/MiniStatCardIcon";
import { useEffect, useState } from "react";

const Dashboard = () => {
	const brandColor = useColorModeValue("accent", "white");
	const sectionTitleFontSize = "16px"

	const [continueWatchingHeight, setContinueWatchingHeight] = useState("0");

	useEffect(() => {
		const height = window.getComputedStyle(document.getElementById("continueWatching")).height
		setContinueWatchingHeight(height)
	})

	const { activeTab, handleTabClick, handleSidebarToggle, setSidebarOption } = useContext(SidebarContext);

	useEffect(() => {
		setSidebarOption("dashboard")
	});


	return (
		<Box m="0" p="0" w={"100%"} h={"max-content"} bg={"gray.50"}>
			<Flex width={"100%"} mb="20px" p={"10px"} direction={"column"} >
				<SimpleGrid columns={{ base: 2, md: 2, lg: 5 }} gap="20px" pl={0} gridRowGap={"5px"}>
					<GridItem colSpan={{ base: 2, md: 2, lg: 5 }}>
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"}>
							Overview
						</Text>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="Courses in Progress" value="03" endContent={<MiniStatCardIcon bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="Completed Courses" value="05" endContent={<MiniStatCardIcon bg={"successFaded"} color={"success"} icon={AiOutlineFileDone} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="WatchTime" value="10h" endContent={<MiniStatCardIcon bg={"dangerFaded"} color={"danger"} icon={MdOutlineVideoLibrary} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="My Study Packs" value="18" endContent={<MiniStatCardIcon bg={"purpleFaded"} color={"purple"} icon={TbPackages} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} display={{ base: "none", lg: "block" }}>
						<MiniStat name="Courses in Progress" value="03" endContent={<MiniStatCardIcon bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
					</GridItem>
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px" mt="10px">
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Grade Analysis
						</Text>
						<GradeAnalysis />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Upcoming Classes
						</Text>
						<UpcommingClasses />
					</GridItem>
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px" mt="10px">
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} mb="10px">
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Continue Watching
						</Text>
						<ContinueWatching />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} mb="10px">
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Recommended Videos
						</Text>
						<RecommendedVideos height={continueWatchingHeight} />
					</GridItem>
				</SimpleGrid>
			</Flex>
		</Box>
	);
};

export default Dashboard;
