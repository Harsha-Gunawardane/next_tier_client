import { Box, GridItem, Text, Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { SidebarContext } from "../../context/SidebarContext";

//components
import MiniStat from "../../components/Card/MiniStat";
import GradeAnalysis from "../../components/DashboardComponents/GradeAnalysis";
import UpcommingClasses from "../../components/DashboardComponents/UpcommingClasses";
import ContinueWatching from "../../components/DashboardComponents/ContinueWatching";
import RecommendedVideos from "../../components/DashboardComponents/RecommendedVidoes";
import MiniStatCardIcon from "../../components/icons/MiniStatCardIcon";

//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PiNotebookBold } from "react-icons/pi";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Dashboard = () => {
	const sectionTitleFontSize = "16px"

	const axiosPrivate = useAxiosPrivate();

	const [recommendedContent, setRecommendedContent] = useState([]);
	const [continueWatching, setContinueWatching] = useState([]);

	const fetchRecommmendedContent = async () => {
		let isMounted = true;
		const controller = new AbortController();

		try {
			const response = await axiosPrivate.get(`/content`, {
				signal: controller.signal
			});

			const data = response.data;
			console.log(data);

			if (isMounted) {
				setRecommendedContent(data);
				//set last 5 data as continue watching
				setContinueWatching(data.slice(-5));
			}
		} catch (error) {
			console.log(error);
		}

	}

	useEffect(() => {
		fetchRecommmendedContent();
	}, []);




	const [continueWatchingHeight, setContinueWatchingHeight] = useState("0");

	useEffect(() => {
		const height = window.getComputedStyle(document.getElementById("continueWatching")).height
		setContinueWatchingHeight(height)
	})

	return (
		<Box m="0" p="0" w={"100%"} h={"max-content"} bg={"gray.50"}>
			<Flex width={"100%"} mb="20px" p={"10px"} direction={"column"} >
				<SimpleGrid columns={{ base: 2, md: 2, lg: 5 }} px={"5px"} gridRowGap={"25px"} gap={"25px"}>
					<GridItem colSpan={{ base: 2, md: 2, lg: 5 }}>
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"}>
							Overview
						</Text>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="Courses in Progress" value="03" endContent={<MiniStatCardIcon color={"blue"} icon={BiBook} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="Completed Courses" value="00" endContent={<MiniStatCardIcon color={"green"} icon={FaRegCircleCheck} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="WatchTime" value="0h" endContent={<MiniStatCardIcon color={"red"} icon={MdOutlineVideoLibrary} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} >
						<MiniStat name="My Study Packs" value="01" endContent={<MiniStatCardIcon color={"purple"} icon={TbPackages} />} />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} display={{ base: "none", lg: "block" }}>
						<MiniStat name="My Notes" value="00" endContent={<MiniStatCardIcon color={"orange"} icon={PiNotebookBold} />} />
					</GridItem>
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap="20px" mt="10px" px={"5px"} gridRowGap={"10px"}>
					<GridItem colSpan={{ base: 1, md: 3, lg: 2 }} >
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Grade Analysis
						</Text>
						<GradeAnalysis />
					</GridItem>
					{/* <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} >
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Upcoming Classes
						</Text>
						<UpcommingClasses />
					</GridItem> */}
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px" mt="10px" px={"5px"} gridRowGap={"10px"} >
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} mb="10px">
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Continue Watching
						</Text>
						<ContinueWatching content={continueWatching} />
					</GridItem>
					{/* <GridItem colSpan={{ base: 1, md: 1, lg: 1 }} mb="10px">
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Recommended Videos
						</Text>
						<RecommendedVideos content={recommendedContent} />
					</GridItem> */}
					<GridItem colSpan={{ base: 1, md: 2, lg: 1 }} >
						<Text fontSize={sectionTitleFontSize} fontWeight={"600"} mb="10px">
							Upcoming Classes
						</Text>
						<UpcommingClasses />
					</GridItem>
				</SimpleGrid>
			</Flex>
		</Box>
	);
};

export default Dashboard;



