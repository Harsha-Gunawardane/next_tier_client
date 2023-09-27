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
import RightPanelCourseViewEnrolled from "./components/RightPanelCourseViewEnrolled";
import PaymentPopup from "./components/PaymentPopup";
import getYearMonth from "../../../utils/getYearMonth";





const CourseViewLayoutEnrolled = (props) => {

    const { RightPanel, LeftPanel } = props;
    const { courseDetails, setCourseDetails } = useOutletContext();
    const { courseId } = useParams();
    var _ = require('lodash');


    //useStates
    const [paymentDetails, setPaymentDetails] = useState({});
    const [paymentList, setPaymentList] = useState([]);

    //useDisclosure
    const { isOpen: paymentPopupIsOpen, onOpen: paymentPopupOnOpen, onClose: paymentPopupOnClose } = useDisclosure();


    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    useEffect(() => {
        if (!_.isEmpty(courseDetails)) {
            createPaymentList(courseDetails);
        }
    }, [courseDetails]);


    useEffect(() => {
        console.log(paymentDetails);
    }, [paymentDetails]);

    //create payment list array from payment details
    const createPaymentList = (courseDetails) => {
        let list = [];
        console.log(courseDetails.study_pack);
        courseDetails.study_pack.map((pack) => {
            var listObj = {
                title: "",
                type: "",
                month: "",
                value: "",
                label: "",
                price: "",
            }

            if (pack.student_purchase_studypack.length === 0) {
                if (new Date(pack.start_date) < Date.now() || new Date(pack.start_date).getMonth + 1 === new Date(Date.now()).getMonth + 1) {
                    listObj.title = pack.title;
                    listObj.type = "monthly payment";
                    listObj.month = getYearMonth(pack.start_date);
                    listObj.value = pack.id;
                    listObj.label = `Pay for ${getYearMonth(pack.start_date)}`;
                    listObj.price = courseDetails.monthly_fee;

                    list.push(listObj);
                }
            }

        });
        console.log(list);
        setPaymentList(list);
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

    const fetchPaymentDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/courses/${courseId}/payment`, {
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





    return (
        <>
            <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"0 10px"} >
                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} h="max-content" bg="white" >
                    <Box position={'sticky'} top={0}>
                        <BreadCrumbForum courseTitle={courseDetails.title} />
                    </Box>
                    <Flex w="100%" my="10px" direction={"column"} gap="15px" px="5px">
                        <Text fontSize="lg" fontWeight="bold" >Current Class</Text>
                        <Flex gap={"10px"} justifyContent={"space-between"} alignItems={"center"} >

                        </Flex>
                    </Flex>
                    <Flex w="100%" my="10px" direction={"column"} gap="15px" px="5px">
                        <Text fontSize="lg" fontWeight="bold" >Course Content</Text>
                        <Flex gap={"10px"} justifyContent={"space-between"} alignItems={"center"} >
                            <CourseContent />
                        </Flex>
                    </Flex>

                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                        {_.isEmpty(courseDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <RightPanelCourseViewEnrolled courseDetails={courseDetails} paymentDetails={paymentDetails} paymentPopupOnOpen={paymentPopupOnOpen} />
                        }
                    </Flex>
                </GridItem>

            </SimpleGrid >
            <PaymentPopup isOpen={paymentPopupIsOpen} onClose={paymentPopupOnClose} courseDetails={courseDetails} setCourseDetails={setCourseDetails} paymentDetails={paymentDetails} paymentList={paymentList} />
        </>
    )
}






export default CourseViewLayoutEnrolled;