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
    SkeletonText,
    Image,


} from "@chakra-ui/react";
import { useOutletContext } from "react-router";
import { useDisclosure } from "@chakra-ui/react";

import notwatched from '../../../assests/images/notwatched.png';

//components
import Post from "./components/Post";
import BreadCrumbForum from "./components/BreadCrumbForum";
import { axiosPrivate } from "../../../api/axios";
import PdfModal from "./PdfViewer";
import { Spoiler } from "@mantine/core";
import { IoTodayOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FaMoneyBills } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import CourseContent from "./components/CourseContent";
import { AreYouSureModal } from "./components/Modals";
import RightPanelStudypackView from "./components/RightPanelStudypackViewNotEnrolled";
import StudypackContent from "./components/StudypackContent";
import MyTag from "../../common/components/MyTag";
import { PiBooksFill, PiGraphFill } from "react-icons/pi";
import periodString from "../../../utils/periodString";
import PaymentPopup from "./components/PaymentPopup";
import calculateUntilDate from "../../../utils/calculateUntilDate";
var _ = require('lodash');






const StudypackViewLayout = (props) => {

    const { studypackId } = useParams();
    const { studypackDetails, setStudypackDetails, paymentStatus } = useOutletContext();

    //useStates
    const [studypackDetailsLoading, setstudypackDetailsLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({});
    const [paymentList, setPaymentList] = useState([]);
    const [lastWatched, setLastWatched] = useState({});

    const toast = useToast();

    //useDisclosure
    const { isOpen: isAreYouSureOpen, onOpen: onAreYouSureOpen, onClose: onAreYouSureClose } = useDisclosure();
    const { isOpen: paymentPopupIsOpen, onOpen: paymentPopupOnOpen, onClose: paymentPopupOnClose } = useDisclosure();

    useEffect(() => {
        if (!_.isEmpty(studypackDetails)) {
            setstudypackDetailsLoading(false);
            createPaymentList(studypackDetails);
        }
    }, [studypackDetails]);

    const createPaymentList = (studypackDetails) => {
        let list = [];
        var listObj = {
            title: "",
            type: "",
            month: "",
            value: "",
            label: "",
            price: "",
        }


        if (studypackDetails.student_purchase_studypack.length === 0) {
            console.log("here at 0");
            listObj.title = studypackDetails.title;
            listObj.type = "purchase";
            listObj.month = "untill " + calculateUntilDate(studypackDetails.access_period);
            listObj.value = studypackDetails.id;
            listObj.label = studypackDetails.title;
            listObj.price = studypackDetails.price;

            list.push(listObj);
        } else if (studypackDetails.student_purchase_studypack.length > 0 && new Date(studypackDetails.student_purchase_studypack[0].expire_date) < new Date()) {
            console.log("here at 1");
            listObj.title = studypackDetails.title;
            listObj.type = "extend";
            listObj.month = "untill " + calculateUntilDate(studypackDetails.access_period);
            listObj.value = studypackDetails.id;
            listObj.label = studypackDetails.title;
            listObj.price = studypackDetails.price;

            list.push(listObj);
        }

        console.log(list);
        setPaymentList(list);
    }


    const fetchPaymentDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/studypacks/${studypackId}/payment`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                setPaymentDetails(data);
            }
        } catch (error) {
            console.log(error);
        }

    }




    // const enrollToCourse = async () => {
    //     try {
    //         const response = await axiosPrivate.post(`/stu/courses/${courseId}/enroll`);
    //         setEnrolled(true);
    //         onAreYouSureClose();

    //         toast({
    //             title: "Enrolled Successfully",
    //             description: "You have successfully enrolled to the course",
    //             status: "success",
    //             duration: 5000,
    //             isClosable: true,
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <>
            <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"0 10px"} >
                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} bg="white" >
                    <Box position={'sticky'} top={0}>
                        <BreadCrumbForum courseTitle={studypackDetails.title} studyPack={true} />
                    </Box>
                    {paymentStatus.status === "Not Paid" ?
                        <Flex w="100%" my="10px" direction={"column"} gap="15px" px="5px">
                            <AspectRatio ratio={6 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                                {!studypackDetailsLoading ?
                                    <img src={studypackDetails.thumbnail} alt="course" />
                                    :
                                    <SkeletonText mt="1" noOfLines={4} spacing="4" />
                                }
                            </AspectRatio>
                            <Heading as="h1" size="lg" fontWeight="bold" >{studypackDetails.title}</Heading>
                            <Flex borderRadius={"10px"}>
                                <Flex direction="column"  >
                                    <Text fontSize={"1.1rem"} fontWeight="semibold" color="gray.500">StudyPack Description</Text>
                                    <Spoiler showLabel="Show More" hideLabel="Show Less" maxHeight={20}>
                                        <Box w="100%" h="100%" overflowY="scroll" >
                                            <Text fontSize={"1rem"}>{studypackDetails.description}</Text>
                                        </Box>
                                    </Spoiler>
                                </Flex>
                            </Flex>
                            <Flex gap={"10px"} justifyContent={"space-between"} alignItems={"center"} >
                                <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} bg="gray.100" borderRadius={"15px"} p="10px" w="50%">
                                    <Flex diection="row" justifyContent={"flex-start"} alignItems={"flex-start"} gap={10}>
                                        <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"center"} color="gray.600">
                                                <PiBooksFill size={"20px"} color="gray.500" />
                                                <Text fontWeight={"medium"} fontSize={"15px"} color="gray.600" textAlign={"left"}>Subject</Text>
                                            </Flex>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                                <Flex gap="0" direction={"column"}>
                                                    {!studypackDetailsLoading && <MyTag tagLabel={studypackDetails.subject} color="green" />}
                                                    {/* <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!studypackDetailsLoading && studypackDetails.schedule[0].day}</Text> */}
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Box h="100%" w="3px" bg={"gray.400"} />
                                        <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"center"} color="gray.600">
                                                <PiGraphFill size={"20px"} color="gray.500" />
                                                <Text fontWeight={"medium"} fontSize={"15px"} color="gray.600" textAlign={"left"}>Subject Areas</Text>
                                            </Flex>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                                <Flex gap="0" direction={"column"}>
                                                    {/* <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!studypackDetailsLoading && studypackDetails.schedule[0].start_time} - {!studypackDetailsLoading && studypackDetails.schedule[0].end_time}</Text> */}
                                                    {!studypackDetailsLoading && studypackDetails.subject_areas.map((area, index) => {
                                                        return (
                                                            <MyTag tagLabel={area} color="blue" />
                                                        )
                                                    }
                                                    )}

                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} bg="gray.100" borderRadius={"15px"} p="10px" w="25%">
                                    {/* <Text fontWeight={"semibold"} fontSize={"12px"} color="gray.700" textAlign={"center"}>Class Schedule</Text> */}
                                    <Flex diection="row" justifyContent={"flex-start"} alignItems={"flex-start"} gap={10}>
                                        <Flex direction={"column"} gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"center"} color="gray.600">
                                                <FaMoneyBills size={"20px"} color="gray.600" />
                                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Price</Text>
                                            </Flex>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                                {/* <FaRegCalendarCheck size={"20px"} color="gray.600" /> */}
                                                <Flex gap="0" direction={"column"}>
                                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. {!studypackDetailsLoading && studypackDetails.price}</Text>
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
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"center"} color="gray.600">
                                                <MdLanguage size={"20px"} color="gray.600" />
                                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Access Period</Text>
                                            </Flex>
                                            <Flex gap={"5px"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                                                {/* <FaRegCalendarCheck size={"20px"} color="gray.600" /> */}
                                                <Flex gap="0" direction={"column"}>
                                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{!studypackDetailsLoading && periodString(studypackDetails.access_period)}</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        :
                        paymentStatus.status === "Paid" ?
                            !_.isEmpty(lastWatched) ?
                                <>

                                </>
                                :
                                <>
                                    <Text fontSize="lg" fontWeight="bold" color="gray.600">Last Watched</Text>
                                    <Flex w="100%" my="10px" direction={"row"} gap="15px" px="5px" alignItems={"center"} bg="gray.50" borderRadius={"10px"}>
                                        {/* <AspectRatio ratio={1 / 1} w="50%" h="200px" borderRadius={"10px"} overflow={"hidden"}> */}
                                        <Image src={notwatched} h="100%" w="20%" alt="course" opacity={"0.7"} />
                                        {/* </AspectRatio> */}
                                        <Flex direction={"column"} gap="5px" justifyContent={"flex-start"} alignItems={"flex-start"} w="70%">
                                            <Text fontSize={"1.1rem"} fontWeight="semibold" color="gray.400">No videos watched yet</Text>
                                            <Text fontSize={"1rem"} color="gray.300">You have not watched any videos yet. Start watching videos to see them here.</Text>
                                        </Flex>
                                    </Flex>
                                </>

                            :
                            null
                    }
                    <Box>
                        <Tabs>
                            <TabList w="100%">
                                <Tab>Content Overview</Tab>
                                <Tab>Reviews</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <StudypackContent />
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                        {_.isEmpty(studypackDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <RightPanelStudypackView studypackDetails={studypackDetails} onAreYouSureOpen={onAreYouSureOpen} paymentPopupOnOpen={paymentPopupOnOpen} enrolled={enrolled} paymentStatus={paymentStatus} />
                        }
                    </Flex>
                </GridItem>

            </SimpleGrid >
            <PaymentPopup isOpen={paymentPopupIsOpen} onClose={paymentPopupOnClose} courseDetails={studypackDetails} setCourseDetails={setStudypackDetails} paymentDetails={paymentDetails} paymentList={paymentList} type={"studypack"} />
        </>
    )
}






export default StudypackViewLayout;