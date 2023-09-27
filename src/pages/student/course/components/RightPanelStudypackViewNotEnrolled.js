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
    Modal,
} from "@chakra-ui/react"

import { Icon } from "@chakra-ui/react";


import rulesImg from "../../../../assests/images/rules2.png"
import { TfiArrowCircleRight } from "react-icons/tfi"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useEffect } from "react"
import MiniStat from "../../../../components/Card/MiniStat"
import MiniStatCardIcon from "../../../../components/icons/MiniStatCardIcon"
import { BiBook } from "react-icons/bi"
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa6"
import { BsPostcardHeartFill } from "react-icons/bs"
import MyTag from "../../../common/components/MyTag"
import { AiOutlineClockCircle } from "react-icons/ai"
import calculateUntilDate from "../../../../utils/calculateUntilDate";
import calculateTimeRemaining from "../../../../utils/calculateTimeRemaining";

const RightPanelStudypackView = (props) => {

    const { studypackDetails, enrolled, onAreYouSureOpen, paymentPopupOnOpen, paymentStatus } = props
    const courseId = useParams().courseId

    useEffect(() => {
        console.log(studypackDetails)
    }, [studypackDetails])

    //useNavigate
    const navigate = useNavigate();

    const navigateToMyCourses = () => {
        navigate(`/stu/mycourses/${courseId}`)
    }


    const loadButton = () => {
        if (paymentStatus.status === "Expired") {
            return (
                <Button variant="solid" bg={"orange.300"} color={"white"} size="md" w="100%" onClick={paymentPopupOnOpen}>Extend Access</Button>
            )
        }
        else if (paymentStatus.status === "Paid") {
            return (
                <Button variant="solid" bg={"gray.300"} color={"gray.900"} size="md" w="100%" onClick={() => { console.log('paid') }} isDisabled={true}>PURCHASED</Button>
            )
        }
        else if (paymentStatus.status === "Not Paid") {
            return (
                <Button variant="solid" bg={"accent"} color={"white"} size="md" w="100%" onClick={paymentPopupOnOpen}>PURCHASE NOW</Button>
            )
        }
    }

    const loadPurchaseCardContent = () => {
        switch (paymentStatus.status) {
            case "Not Paid":
                return (
                    <Flex diection="row" justifyContent={"center"} alignItems={"center"} gap={10}>
                        {/* <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Started On</Text>
                                    <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                        <FaRegCalendarCheck size={"20px"} color="gray.600" />
                                        <Flex gap="0" direction={"column"}>
                                            <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>SEP 2023</Text>
                                            <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Box h="100%" w="2px" bg={"gray.50"} /> */}
                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"} noOfLines={1}>Will be available untill (from Today)</Text>
                            <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                <AiOutlineClockCircle size={"20px"} color="gray.600" />
                                <Flex gap="0" direction={"column"}>
                                    {/* calculate day from today + asccess perios  access_period = { days: 14, years: 1, months: 1 } date will be shown in 19 SEP 2023 mannar*/}
                                    {console.log(studypackDetails.access_period)}
                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{calculateUntilDate(studypackDetails.access_period).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )
            case "Paid" || "Expired":
                return (
                    <Flex diection="row" justifyContent={"center"} alignItems={"center"} gap={10}>
                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"} noOfLines={1}>Time Remaining</Text>
                            <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                <AiOutlineClockCircle size={"20px"} color="gray.600" />
                                <Flex gap="0" direction={"column"}>
                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>{calculateTimeRemaining(studypackDetails.student_purchase_studypack[0].expire_date)}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Box h="100%" w="2px" bg={"gray.50"} />
                        <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Extension Fee</Text>
                            <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                <FaRegCalendarCheck size={"20px"} color="gray.600" />
                                <Flex gap="0" direction={"column"}>
                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. 400</Text>
                                    {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )

            default:
                break;

        }
    }

    return (
        <Flex gap="10px" direction={"column"} w="100%">
            {paymentStatus.status === "Not Paid" &&
                <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                    <Text fontWeight={"bold"} fontSize={"16px"} color={"gray.600"}>Tutor Overview</Text>
                </Flex>
            }
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                {paymentStatus.status === "Paid" || paymentStatus.status === "Expired" ?
                    <>
                        <AspectRatio ratio={4 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                            <Image src={studypackDetails.thumbnail} alt="Segun Adebayo" />
                        </AspectRatio>
                        <Text fontWeight={"bold"} fontSize={"20px"} color="gray.800" mt="5px" align={"left"} noOfLines={1}>{studypackDetails.title}</Text>
                    </>
                    :
                    null
                }
                {/* forum title */}
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px">
                    <Avatar size={"md"} name='Ryan Florence' src={studypackDetails.tutor.user.profile_picture} />
                    <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.800">Mr. {studypackDetails.tutor.user.first_name} {studypackDetails.tutor.user.last_name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600">{studypackDetails.tutor.qualifications[0]}</Text>
                    </Flex>
                </Flex>
                {paymentStatus.status === "Not Paid" ?
                    <Flex w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={3}>
                        <Text noOfLines={3} fontSize={"14px"} color="gray.600" >
                            {studypackDetails.tutor.description}
                        </Text>
                        <Flex w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"row"} gap={3}>
                            {studypackDetails.tutor.subjects.map((subject, index) => {
                                return (
                                    <MyTag key={index} tagLabel={subject} color="blue" />
                                )
                            })}
                            {studypackDetails.tutor.medium.map((medium, index) => {
                                return (
                                    <MyTag key={index} tagLabel={medium} color="green" />
                                )
                            })}
                        </Flex>
                        <Flex w="100%" justifyContent={"flex-end"}>
                            <Button variant={"ghost"} color={"gray.600"} size="sm" rightIcon={<TfiArrowCircleRight />} >View Tutor Profile</Button>
                        </Flex>
                    </Flex> :
                    <></>
                }
            </Flex>
            <Flex width={"100%"} px="20px" mt="10px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                <Text fontWeight={"bold"} fontSize={"14px"} color="gray.500" noOfLines={1}>Studypack Status</Text>
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
                    {paymentStatus.status === "Not Paid" ?
                        <Box
                            backgroundColor="gray.100"
                            borderRadius="8px"
                            padding="10px"
                        >
                            <Text fontWeight={"medium"} fontSize={"16px"} color="gray.800" textAlign={"left"}>
                                When You Purchase:
                            </Text>
                            <Text fontSize={"14px"} color="gray.600" textAlign={"left"} fontWeight={400} marginTop="6px">
                                <Icon as={FaRegCalendarCheck} mr="2" />
                                Gain complete access to the entire content.
                            </Text>
                            <Text fontSize={"14px"} color="gray.600" textAlign={"left"} fontWeight={400} marginTop="6px">
                                <Icon as={AiOutlineClockCircle} mr="2" />
                                Extend study pack and course content access as needed for ongoing learning.
                            </Text>
                        </Box>
                        :
                        null
                    }

                    <Flex w="100%" p="15px" position={"relative"}>
                        {/* </Flex> */}
                        <Flex direction={"column"} width={"100%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                            {/* <Flex direction={"column"} gap={"5px"}> */}
                            {/* <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"center"}>Class Status</Text> */}
                            {loadPurchaseCardContent()}
                            {loadButton()}
                        </Flex>
                        {/* <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} /> */}
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    )

}

export default RightPanelStudypackView