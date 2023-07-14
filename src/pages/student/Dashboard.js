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
		<Box m="0" p="0" w={"100%"} h={"1000px"}>
			<Flex columns={{ base: 1, md: 3, lg: 6, "2xl": 4 }} mb="20px" p={"10px"}>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }}>
					<Text fontSize={"0.8rem"} fontWeight={"600"}>
						Overview
					</Text>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 5, "2xl": 6 }} gap="20px" p={"10px"} pl={0}>
						<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
						<MiniStat name="Completed Courses" value="05" endContent={<IconBox w="48px" h="48px" bg={"successFaded"} color={"success"} icon={AiOutlineFileDone} />} />
						<MiniStat name="WatchTime" value="10h" endContent={<IconBox w="48px" h="48px" bg={"dangerFaded"} color={"danger"} icon={MdOutlineVideoLibrary} />} />
						<MiniStat name="My Study Packs" value="18" endContent={<IconBox w="48px" h="48px" bg={"purpleFaded"} color={"purple"} icon={TbPackages} />} />
						<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={BiBook} />} />
					</SimpleGrid>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }}>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px">
								<Text fontSize={"0.8rem"} fontWeight={"600"}>
									Grade Analysis
								</Text>
							</Flex>
							<GradeAnalysis />
						</GridItem>
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px">
								<Text fontSize={"0.8rem"} fontWeight={"600"}>
									Upcoming Classes
								</Text>
							</Flex>
							<UpcommingClasses />
						</GridItem>
					</SimpleGrid>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }}>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} p={"10px"}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px" direction={"column"}>
								<Text fontSize={"0.8rem"} fontWeight={"600"}>
									Continue Watching
								</Text>
								<ContinueWatching />
							</Flex>
						</GridItem>
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} p={"10px"}>
							<Text fontSize={"0.8rem"} fontWeight={"600"}>
								Recommended Videos
							</Text>
							{/* <RecommendedVideos /> */}
						</GridItem>
					</SimpleGrid>
				</GridItem>
			</Flex>
		</Box>
	);
};

export default Dashboard;
