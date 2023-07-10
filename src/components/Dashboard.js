import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Avatar, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

import MiniStat from "./Card/MiniStat";

import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from "react-icons/md";

import IconBox from "./icons/IconBox";
import DMiniStat from "./Card/DMiniStat";

//icons
import { BiBook } from "react-icons/bi";
import { TbAwardFilled, TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import GradeAnalysis from "./DashboardComponents/GradeAnalysis";
import UpcommingClasses from "./DashboardComponents/UpcommingClasses";
import { ContinueWatching } from "./DashboardComponents/ContinueWatching";
import RecommendedVideos from "./DashboardComponents/RecommendedVidoes";

const Dashboard = () => {
	const brandColor = useColorModeValue("accent", "white");

	return (
		<Box m="0" p="0" w={"100%"} h={"full"} overflow={"auto"} bg={"gray.50"}>
			<SimpleGrid columns={{ base: 1, md: 3, lg: 6, "2xl": 4 }} mb="20px" p={"10px"}>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }} bg={"gray.50"} pl={"10px"}>
					<Heading fontSize={"0.6rem"}>Overview</Heading>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 5, "2xl": 6 }} gap="20px" p={"10px"} pl={0}>
						<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={<BiBook w="32px" h="32px" />} />} />
						<MiniStat name="Completed Courses" value="05" endContent={<IconBox w="48px" h="48px" bg={"successFaded"} color={"success"} icon={<TbAwardFilled w="32px" h="32px" />} />} />
						<MiniStat name="WatchTime" value="10h" endContent={<IconBox w="48px" h="48px" bg={"dangerFaded"} color={"danger"} icon={<MdOutlineVideoLibrary w="32px" h="32px" />} />} />
						<MiniStat name="My Study Packs" value="18" endContent={<IconBox w="48px" h="48px" bg={"purpleFaded"} color={"purple"} icon={<TbPackages w="32px" h="32px" />} />} />
						<MiniStat name="Courses in Progress" value="03" endContent={<IconBox w="48px" h="48px" bg={"accentFaded"} color={"accent"} icon={<BiBook w="32px" h="32px" />} />} />
					</SimpleGrid>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }} bg={"gray.50"}>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px">
								<Heading fontSize={"0.6rem"} pb="10px">
									Grade Analysis
								</Heading>
							</Flex>
							<GradeAnalysis />
						</GridItem>
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px">
								<Heading fontSize={"0.6rem"} pb="10px">
									Upcoming Classes
								</Heading>
							</Flex>
							<UpcommingClasses />
						</GridItem>
					</SimpleGrid>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3, lg: 6 }} bg={"gray.50"}>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap="20px">
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
							<Flex justifyContent="space-between" alignItems="center" mb="10px">
								<Heading fontSize={"0.6rem"} pb="10px">
									Continue Watching
								</Heading>
								{/* <ContinueWatching /> */}
							</Flex>
						</GridItem>
						<GridItem colSpan={{ base: 1, md: 1, lg: 1 }} bg={"gray.50"} p={"10px"}>
							<Heading fontSize={"0.6rem"} pb="10px">
								Recommended Videos
							</Heading>
							{/* <RecommendedVideos /> */}
						</GridItem>
					</SimpleGrid>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
};

export default Dashboard;
