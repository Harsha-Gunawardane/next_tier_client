import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    AspectRatio,
    Box,
    Flex,
    GridItem,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,


} from "@chakra-ui/react";
import { useOutletContext } from "react-router";
import { useDisclosure } from "@chakra-ui/react";


//components
import Post from "./components/Post";
import BreadCrumbForum from "./components/BreadCrumbForum";
import { InputBoxButton } from "./components/InputBoxBotton";
import { axiosPrivate } from "../../../api/axios";
import PdfModal from "./PdfViewer";
import RightPanelCourseViewNotEnrolled from "./components/RightPanelCourseViewNotEnrolled";
import { Spoiler } from "@mantine/core";
import { IoTodayOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaMoneyBills } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import CourseContent from "./components/CourseContent";
import { AreYouSureModal } from "./components/Modals";





const CourseViewLayout = (props) => {

    const { RightPanel, LeftPanel } = props;
    const { courseDetails } = useOutletContext();
    const [courseDetailsLoading, setCourseDetailsLoading] = useState(true);
    const { courseId } = useParams();
    var _ = require('lodash');


    //useStates
    const [postOnModal, setPostOnModal] = useState(null);
    const [forumDetails, setForumDetails] = useState();
    const [posts, setPosts] = useState([]);

    const [enrolled, setEnrolled] = useState(false);
    const [paid, setPaid] = useState({});
    const [studyPackDetails, setStudyPackDetails] = useState(null);
    const [studyPackDetailsLoading, setStudyPackDetailsLoading] = useState(true);

    const toast = useToast();

    //useDisclosure
    const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();
    const { isOpen: isPdfOpen, onOpen: onPdfOpen, onClose: onPdfClose } = useDisclosure();
    const { isOpen: isAreYouSureOpen, onOpen: onAreYouSureOpen, onClose: onAreYouSureClose } = useDisclosure();

    useEffect(() => {
        if (!_.isEmpty(courseDetails)) {
            setCourseDetailsLoading(false);
        }
    }, [courseDetails]);

    useEffect(() => {
        setStudyPackDetails(courseDetails.study_pack);
        setEnrolled(_.isEmpty(courseDetails.student_enrolled_course) ? false : true);
        console.log(enrolled)
    }, [courseDetails, studyPackDetails]);

    useEffect(() => {
        if (studyPackDetails) {
            setStudyPackDetailsLoading(false);
            studyPackDetails.map((studyPack, index) => {
                setPaid((prev) => {
                    if (_.isEmpty(studyPack.student_purchase_studypack)) {
                        return { ...prev, [studyPack.id]: "Not Paid" }
                    } else {
                        const purchase = studyPack.student_purchase_studypack[0];
                        if (purchase.expire_date < Date.now()) {
                            return { ...prev, [studyPack.id]: "Expired" }
                        } else {
                            return { ...prev, [studyPack.id]: "Paid" }
                        }
                    }
                })
            })
        }
        console.log(studyPackDetails);
    }, [studyPackDetails]);

    useEffect(() => {
        console.log(paid);
    }, [paid]);

    const enrollToCourse = async () => {
        try {
            const response = await axiosPrivate.post(`/stu/courses/${courseId}/enroll`);
            console.log(response.data);
            setEnrolled(true);
            onAreYouSureClose();

            toast({
                title: "Enrolled Successfully",
                description: "You have successfully enrolled to the course",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error);
        }
    }



    // const fetchCourseDetails = async () => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     try {
    //         const response = await axiosPrivate.get(`/stu/courses/${courseId}`, {
    //             signal: controller.signal
    //         });

    //         const data = response.data;

    //         if (isMounted) {
    //             setForumDetails(data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }


    return (
        <>
            <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"0 10px"} >
                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} h="max-content" bg="white" >
                    <Box position={'sticky'} top={0}>
                        <BreadCrumbForum courseTitle={courseDetails.title} />
                    </Box>
                    <Flex w="100%" my="10px" direction={"column"} gap="15px" px="5px">
                        <AspectRatio ratio={6 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                            {!courseDetailsLoading ?
                                <img src={courseDetails.thumbnail} alt="course" objectFit="cover" />
                                :
                                <Skeleton height={"50px"} width={"100%"} />
                            }
                        </AspectRatio>
                        <Heading as="h1" size="lg" fontWeight="bold" >{courseDetails.title}</Heading>
                        <Flex borderRadius={"10px"}>
                            <Flex direction="column"  >
                                <Text fontSize={"1.1rem"} fontWeight="semibold" color="gray.500">Course Description</Text>
                                <Spoiler showLabel="Show More" hideLabel="Show Less" maxHeight={20}>
                                    <Box w="100%" h="100%" overflowY="scroll" >
                                        <Text fontSize={"1rem"}>{courseDetails.description}</Text>
                                    </Box>
                                </Spoiler>
                            </Flex>
                        </Flex>
                        <Flex gap={"10px"} justifyContent={"space-between"} alignItems={"center"} >
                            <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} bg="gray.100" borderRadius={"15px"} p="10px" w="50%">
                                {/* <Text fontWeight={"semibold"} fontSize={"12px"} color="gray.700" textAlign={"center"}>Class Schedule</Text> */}
                                <Flex diection="row" justifyContent={"flex-start"} alignItems={"flex-start"} gap={10}>
                                    <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <IoTodayOutline size={"20px"} color="gray.600" />
                                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Day</Text>
                                        </Flex>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            {/* <FaRegCalendarCheck size={"20px"} color="gray.600" /> */}
                                            <Flex gap="0" direction={"column"}>
                                                {console.log(courseDetails)}
                                                <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!courseDetailsLoading && courseDetails.schedule[0].day}</Text>
                                                {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Box h="100%" w="3px" bg={"gray.400"} />
                                    <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <IoMdTime size={"20px"} color="gray.600" />
                                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Time</Text>
                                        </Flex>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            {/* <AiOutlineClockCircle size={"20px"} color="gray.600" /> */}
                                            <Flex gap="0" direction={"column"}>
                                                <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!courseDetailsLoading && courseDetails.schedule[0].start_time} - {!courseDetailsLoading && courseDetails.schedule[0].end_time}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} bg="gray.100" borderRadius={"15px"} p="10px" w="25%">
                                {/* <Text fontWeight={"semibold"} fontSize={"12px"} color="gray.700" textAlign={"center"}>Class Schedule</Text> */}
                                <Flex diection="row" justifyContent={"flex-start"} alignItems={"flex-start"} gap={10}>
                                    <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <FaMoneyBills size={"20px"} color="gray.600" />
                                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Fees</Text>
                                        </Flex>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            {/* <FaRegCalendarCheck size={"20px"} color="gray.600" /> */}
                                            <Flex gap="0" direction={"column"}>
                                                <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. {!courseDetailsLoading && courseDetails.monthly_fee}/month</Text>
                                                {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} bg="gray.100" borderRadius={"15px"} p="10px" w="25%">
                                {/* <Text fontWeight={"semibold"} fontSize={"12px"} color="gray.700" textAlign={"center"}>Class Schedule</Text> */}
                                <Flex diection="row" justifyContent={"flex-start"} alignItems={"flex-start"} gap={10}>
                                    <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <MdLanguage size={"20px"} color="gray.600" />
                                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Medium</Text>
                                        </Flex>
                                        <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            {/* <FaRegCalendarCheck size={"20px"} color="gray.600" /> */}
                                            <Flex gap="0" direction={"column"}>
                                                <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!courseDetailsLoading && courseDetails.medium}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Tabs>
                        <TabList w="100%">
                            <Tab>Content Overview</Tab>
                            <Tab>Reviews</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <CourseContent />
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                        {_.isEmpty(courseDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <RightPanelCourseViewNotEnrolled courseDetails={courseDetails} onAreYouSureOpen={onAreYouSureOpen} enrolled={enrolled} />
                        }
                    </Flex>
                </GridItem>

            </SimpleGrid >
            <AreYouSureModal isOpen={isAreYouSureOpen} onClose={onAreYouSureClose} enrollToCourse={enrollToCourse} />
        </>
    )
}






export default CourseViewLayout