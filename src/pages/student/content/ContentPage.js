import {
    Box,
    GridItem,
    SimpleGrid,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    AspectRatio,
    Image,
    Tag,
    Avatar,
    Flex,
    Text,
    Card


} from "@chakra-ui/react"
import { Link } from "react-router-dom";

import generateTimeAgoString from "../../../utils/timesAgo"
import countToString from "../../../utils/countToString"
import CardsCarousel from "./components/carouselCard"

const { rest } = require("lodash")



//video table
// model content {
//     id                String              @id @default(uuid())
//     title             String
//     description       String
//     user_id           String
//     type              content_type?
//     subject           String
//     subject_areas     String[]
//     uploaded_at       DateTime?           @default(now())
//     status            content_status?     @default(PUBLIC)
//     file_path         String?
//     thumbnail         String?
//     reactions         Json?               @default("{}") // {like: 0, dislike: 0, views: 0 ,comments: 0}
//     content_reactions content_reactions[]
//     content_views     content_views[]
//     comments          comments[]

//     user users @relation(fields: [user_id], references: [id])
//   }
//longer title
const Videolist = [
    {
        id: "c1",
        title: "Physics - Mechanics Part 1 - Units and Dimensions",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Units and Dimensions"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
    {
        id: 2,
        title: "Physics - Mechanics Part 2 - Kinematics",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Kinematics"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
    {
        id: 3,
        title: "Physics - Mechanics Part 3 - Dynamics",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Dynamics"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
    {
        id: 4,
        title: "Physics - Mechanics Part 4 - Work, Energy and Power",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Work, Energy and Power"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
    {
        id: 5,
        title: "Physics - Mechanics Part 5 - Rotational Motion",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Rotational Motion"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
    {
        id: 6,
        title: "Physics - Mechanics Part 6 - Gravitation",
        description: "This is a video about physics",
        user_id: "1",
        type: "video",
        subject: "Physics",
        subject_areas: ["Mechanics", "Gravitation"],
        uploaded_at: "2021-08-01T00:00:00.000Z",
        status: "PUBLIC",
        file_path: "https://www.youtube.com/watch?v=1q7nA8z0pRs",
        thumbnail: "https://unsplash.it/1600/900",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        content_reactions: [],
        content_views: [],
        comments: [],
        user: {
            id: "1",
            name: "Samitha Rathnayake",
        },
        _count: {
            content_reactions: 0,
            content_views: 1000,
            comments: 0
        }
    },
]



const ContentPage = (props) => {

    const { ...rest } = props


    return (
        <Box w="100%" p="10px" >
            <SimpleGrid columns={12} gap={3}>
                <GridItem colSpan={12}>
                    <Text fontSize={"16px"} fontWeight={"bold"}>
                        Upcoming Videos
                    </Text>
                </GridItem>
                <GridItem colSpan={8} h="250px" padding={"10px"}>
                    <Box
                        h="100%"
                        w="100%"
                        bg="white"
                        boxShadow={"-7px -7px 16px 0 #FBFBFB, 7px 7px 10px -4px rgba(116,150,179,0.27)"}
                        // boxShadow={"0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135"}
                        borderRadius={"10px"}
                        overflow="hidden"
                    >
                        <CardsCarousel videoList={Videolist} />
                    </Box>
                </GridItem>

                <GridItem colSpan={4} h="250px" padding={"10px"}>
                    <Card
                        width={"100%"}
                        // height={"200px"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        direction={"column"}
                        p="10px"
                        gap="10px"
                        boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                        bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                        h="100%"
                    // bg = "green.200"
                    >
                        <Flex w="100%" h={"100%"} p="15px" position={"relative"} justifyContent={"center"} alignItems={"center"} direction={"row"} >
                            <Flex direction={"column"} width={"100%"} gap="16px" zIndex={1} justifyContent={"center"}>
                                <Flex direction={"column"} gap={"5px"} textAlign={"center"}>
                                    <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"left"}>Motivate Yourself</Text>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>"There is no end to education. It is not that you read a
                                        book, pass an examination, and finish with education.
                                        The whole of life, from the moment you are born to
                                        the moment you die, is a process of learning."
                                    </Text>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>– Jiddu Krishnamurti</Text>
                                </Flex>
                            </Flex>
                            {/* <Flex width={"40%"} overflow={"visible"} position={"relative"}> */}
                            {/* <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} /> */}
                            {/* </Flex> */}
                        </Flex>
                    </Card>

                </GridItem>
                <GridItem colSpan={12}  >
                    <Tabs variant='soft-rounded' colorScheme='gray' size={"sm"} lazyBehavior={true}>
                        <TabList size="sm" position={"sticky"}>
                            <Tab>All</Tab>
                            <Tab>Physics</Tab>
                            <Tab>Chemistry</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={12} gap={3} >
                                    {Videolist.map((video) => {
                                        return (
                                            <GridItem colSpan={3} >
                                                <VideoCard videoDetails={video} />
                                            </GridItem>
                                        )
                                    })}
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
                {/* loop to render 9 elements */}


            </SimpleGrid>
        </Box >
    )
}




const VideoCard = (props) => {
    const { videoDetails, ...rest } = props

    return (
        <Box w="100%" h="100%" borderRadius={"10px"} {...rest} _hover={{ cursor: "pointer" }} >
            <Link to={`/stu/content/watch/${videoDetails.id}`} >
                <Box w="100%" position={"relative"} >
                    <AspectRatio maxW="100%" ratio={16 / 9} borderRadius={"10px"} overflow="hidden">
                        <Image src={videoDetails.thumbnail} alt="Segun Adebayo" objectFit="cover" />
                    </AspectRatio>
                    <Tag position={"absolute"} bottom="10px" right="10px" colorScheme="black" size="xs" bg="gray.900" color={"white"} borderRadius={"5px"} padding={"4px"} fontSize={"12px"}>
                        60:30
                    </Tag>
                </Box>
                <SimpleGrid w="100%" gap="5px" position={"relative"} columns={12} templateColumns={"max-content repeat(11, 1fr)"} mt="5px">
                    <GridItem colSpan={1} w="max-content">
                        <Avatar h="36px" w="36px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" mt="5px" />
                    </GridItem>
                    <GridItem colSpan={11} px="5px">
                        <Flex w="100%" justifyContent={"space-between"} alignItems={"flex-start"} mt="5px" direction={"column"}>
                            <Flex gap={"10px"} direction={"column"}>
                                <Text noOfLines={2} fontSize={"14px"} fontWeight={"bold"}>{videoDetails.title}</Text>
                            </Flex>
                            <Flex color={"gray.400"}>
                                <Text fontSize={"12px"} fontWeight={""} >{videoDetails.user.name}</Text>
                            </Flex>
                            <Flex gap={"5px"} color={"gray.400"}>
                                <Text fontSize={"11px"} fontWeight={"medium"} >{countToString(videoDetails._count.content_views)} views</Text>
                                <Text fontSize={"11px"} fontWeight={"medium"} >•</Text>
                                <Text fontSize={"11px"} fontWeight={"medium"} >{generateTimeAgoString(videoDetails.uploaded_at)}</Text>
                            </Flex>
                        </Flex>
                    </GridItem>
                </SimpleGrid>
            </Link>
        </Box >
    )
}


export default ContentPage;
