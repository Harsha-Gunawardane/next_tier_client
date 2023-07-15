import { Box, Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Avatar, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

import MiniStat from "../../components/Card/MiniStat";

import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";

import IconBox from "../../components/icons/IconBox";
import DMiniStat from "../../components/Card/DMiniStat";

//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import GradeAnalysis from "../../components/DashboardComponents/GradeAnalysis";
import UpcommingClasses from "../../components/DashboardComponents/UpcommingClasses";
import ContinueWatching from "../../components/DashboardComponents/ContinueWatching";
import RecommendedVideos from "../../components/DashboardComponents/RecommendedVidoes";

const Dashboard = () => {
	const brandColor = useColorModeValue("accent", "white");

	return (
		<Box m="0" p="0" w={"100%"} h={"max-content"}>
			<Flex width={"100%"} mb="20px" p={"10px"} direction={"column"}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap="20px" pl={0} gridRowGap={"5px"}>
					<GridItem colSpan={{ base: 1, md: 2, lg: 5 }}>
						<Text fontSize={"0.8rem"} fontWeight={"600"}>
							Overview
						</Text>
					</GridItem>
					<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
					<MiniStat name="Completed Courses" value="05" endContent={<IconBox w="48px" h="48px" bg={"successFaded"} color={"success"} icon={AiOutlineFileDone} />} />
					<MiniStat name="WatchTime" value="10h" endContent={<IconBox w="48px" h="48px" bg={"dangerFaded"} color={"danger"} icon={MdOutlineVideoLibrary} />} />
					<MiniStat name="My Study Packs" value="18" endContent={<IconBox w="48px" h="48px" bg={"purpleFaded"} color={"purple"} icon={TbPackages} />} />
					<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
						<Text fontSize={"0.8rem"} fontWeight={"600"}>
							Grade Analysis
						</Text>
						<GradeAnalysis />
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
						<Text fontSize={"0.8rem"} fontWeight={"600"}>
							Upcoming Classes
						</Text>
						<UpcommingClasses />
					</GridItem>
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
						<Text fontSize={"0.8rem"} fontWeight={"600"}>
							Continue Watching
						</Text>
						{/* <ContinueWatching /> */}
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
						<Text fontSize={"0.8rem"} fontWeight={"600"}>
							Recommended Videos
						</Text>
						{/* <RecommendedVideos /> */}
					</GridItem>
				</SimpleGrid>
			</Flex>
		</Box>
	);
};

export default Dashboard;
