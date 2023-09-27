import {
    Flex,
    Text,
    AspectRatio,
    Image,
    Avatar,
    Card,
    Button,
    Box,
    AvatarGroup,
} from "@chakra-ui/react"

import { Icon } from "@chakra-ui/react";


import rulesImg from "../../../../assests/images/forum.png"
import { TfiArrowCircleRight } from "react-icons/tfi"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useEffect } from "react"
import MiniStat from "../../../../components/Card/MiniStat"
import MiniStatCardIcon from "../../../../components/icons/MiniStatCardIcon"
import { BiBook, BiWallet } from "react-icons/bi"
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa6"
import { BsPostcardHeartFill } from "react-icons/bs"
import MyTag from "../../../common/components/MyTag"
import { AiOutlineClockCircle } from "react-icons/ai"
import AnnouncementCard from "./AnnouncementCard";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import getYearMonth from "../../../../utils/getYearMonth";
import _ from "lodash";
import PaymentPopup from "./PaymentPopup";

const Announcements = [
    {
        title: "Class Cancelled",
        // date in iso format to used in dateText function in utils should compere with new Date()
        date: "01/06/2021",
        time: "10:00 AM",
        color: "red"
    },
    {
        title: "Welcome to the Class",
        date: "01/06/2021",
        time: "10:00 AM",
        color: "red"
    },
]

const RightPanelCourseViewNotEnrolled = (props) => {

    const {
        courseDetails,
        paymentDetails,
        enrolled,
        paymentPopupOnOpen,
    } = props
    const courseId = useParams().courseId

    //useStates

    const { onAreYouSureOpen } = props
    // const { courseDetails } = useOutletContext

    useEffect(() => {
        console.log(courseDetails)
    }, [courseDetails])

    //useNavigate
    const navigate = useNavigate();

    const navigateToForum = () => {
        navigate(`/stu/mycourses/${courseId}/forum`)
    }



    return (
        <Flex gap="10px" direction={"column"} w="100%">
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                <Text fontWeight={"bold"} fontSize={"16px"} color={"gray.600"}>Course Overview</Text>
            </Flex>
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                {/* <AspectRatio ratio={4 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                    <Image src={forumDetails.course.thumbnail} alt="Segun Adebayo" />
                </AspectRatio> */}
                <Text fontWeight={"bold"} fontSize={"20px"} color="gray.800" mt="10px" align={"left"} noOfLines={1}>{courseDetails.title}</Text>
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px">
                    <Avatar size={"sm"} name='Ryan Florence' src={courseDetails.tutor.user.profile_picture} />
                    <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.800">Mr. {courseDetails.tutor.user.first_name} {courseDetails.tutor.user.last_name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600">{courseDetails.tutor.qualifications[0]}</Text>
                    </Flex>
                </Flex>

            </Flex>

            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                <Card
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    direction={"column"}
                    p="5px"
                    gap="10px"
                    boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                    // bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                    borderRadius={"10px"}
                >

                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"100%"} gap="8px" zIndex={1} justifyContent={"space-between"}>
                            {/* <Flex direction={"column"} gap={"5px"}> */}
                            <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.700" textAlign={"left"}>Class Announcements</Text>
                            <Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" w="100%" p="10px" overflowY={"scroll"}>
                                {Announcements
                                    ? Announcements.map((announcement, index) => {
                                        // console.log(event);
                                        return <AnnouncementCard title={announcement.title} date={announcement.date} time={announcement.time} color={"red"} />
                                    })
                                    : console.log("No events")}
                            </Flex>

                            {/* </Flex> */}
                            {enrolled ?
                                <>
                                    <Text fontSize={"14px"} color="gray.600" textAlign={"center"} fontWeight={400} marginTop="6px">
                                        You have already enrolled for this course.
                                    </Text>
                                    <Button variant="solid" bg={"accent"} color={"white"} size="md" w="100%" >VIEW COURSE</Button>
                                </> :
                                <Flex diection="row" justifyContent={"flex-end"} alignItems={"center"} gap={10}>
                                    <Button
                                        variant="solid"
                                        bg={"accent"}
                                        color={"white"}
                                        size="sm"
                                        width={"max-content"}
                                        leftIcon={<HiOutlineSpeakerphone />}
                                        onClick={onAreYouSureOpen}
                                    >
                                        All Announcements
                                    </Button>
                                </Flex>
                            }
                        </Flex>
                        {/* <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} /> */}
                    </Flex>
                </Card>
            </Flex>

            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                <Card
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    direction={"column"}
                    p="10px"
                    gap="10px"
                    boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                    // bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                    borderRadius={"10px"}
                >

                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"100%"} gap="8px" zIndex={1} justifyContent={"space-between"}>
                            {/* <Flex direction={"column"} gap={"5px"}> */}
                            <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.700" textAlign={"left"}>Class Payment</Text>
                            <Flex diection="row" justifyContent={"center"} alignItems={"center"} gap={10}>
                                <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Monthly Fee</Text>
                                    <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                        <BiWallet size={"20px"} color="gray.600" />
                                        <Flex gap="0" direction={"column"}>
                                            <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. {courseDetails.monthly_fee}</Text>
                                            {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Box h="100%" w="2px" bg={"gray.50"} />
                                <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Last Payment</Text>
                                    <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                        <AiOutlineClockCircle size={"20px"} color="gray.600" />
                                        <Flex gap="0" direction={"column"}>
                                            <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>
                                                {/* {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(paymentDetails.payments[0].pack.start_date))} */}
                                                {!_.isEmpty(paymentDetails.payments) ? getYearMonth(paymentDetails.payments[0].pack.start_date) : "N/A"}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            {/* </Flex> */}
                            {enrolled ?
                                <>
                                    <Text fontSize={"14px"} color="gray.600" textAlign={"center"} fontWeight={400} marginTop="6px">
                                        You have already enrolled for this course.
                                    </Text>
                                    <Button variant="solid" bg={"accent"} color={"white"} size="md" w="100%" >VIEW COURSE</Button>
                                </> :
                                <Flex diection="row" justifyContent={"flex-end"} alignItems={"center"} gap={10}>
                                    <Button
                                        variant="solid"
                                        bg={"#00c9b7"}
                                        color={"white"}
                                        size="md"
                                        width={"100%"}
                                        onClick={paymentPopupOnOpen}
                                    >
                                        Pay Online
                                    </Button>
                                </Flex>
                            }
                        </Flex>
                        {/* <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} /> */}
                    </Flex>
                </Card>
            </Flex>

            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
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
                    mt={"20px"}
                // bg = "green.200"
                >
                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"70%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                            <Flex direction={"column"} gap={"5px"}>
                                <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"left"}>Class Forum</Text>
                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Introducing Class Forums. Discuss the subject with your Friends and Tutor</Text>
                            </Flex>
                            <Button variant="solid" bg={"accent"} color={"white"} size="sm" width={"max-content"} onClick={navigateToForum}>Visit Forum</Button>
                        </Flex>
                        {/* <Flex width={"40%"} overflow={"visible"} position={"relative"}> */}
                        <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} />
                        {/* </Flex> */}
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    )

}

export default RightPanelCourseViewNotEnrolled