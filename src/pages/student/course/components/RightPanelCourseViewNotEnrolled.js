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

const RightPanelCourseViewNotEnrolled = (props) => {

    const { courseDetails, enrolled } = props
    const courseId = useParams().courseId


    const { forumDetails, onAreYouSureOpen } = props
    // const { courseDetails } = useOutletContext

    useEffect(() => {
        console.log(courseDetails)
    }, [courseDetails])

    //useNavigate
    const navigate = useNavigate();

    const navigateToMyCourses = () => {
        navigate(`/stu/mycourses/${courseId}`)
    }



    return (
        <Flex gap="10px" direction={"column"} w="100%">
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                <Text fontWeight={"bold"} fontSize={"20px"} color={"gray.600"}>Tutor Overview</Text>
            </Flex>
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                {/* <AspectRatio ratio={4 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                    <Image src={forumDetails.course.thumbnail} alt="Segun Adebayo" />
                </AspectRatio> */}
                {/* forum title */}
                {/* <Text fontWeight={"bold"} fontSize={"20px"} color="gray.800" mt="10px" align={"left"} noOfLines={1}>{courseDetails.title}</Text> */}
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px">
                    <Avatar size={"md"} name='Ryan Florence' src={courseDetails.tutor.user.profile_picture} />
                    <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.800">Mr. {courseDetails.tutor.user.first_name} {courseDetails.tutor.user.last_name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600">{courseDetails.tutor.qualifications[0]}</Text>
                    </Flex>
                </Flex>
                <Flex w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={3}>
                    <Text noOfLines={3} fontSize={"14px"} color="gray.600" >
                        {/* description about tutor */}
                        I'm Experienced Tutor who holds a degree in Physics. I currently have a role in the Physics community and is currently a member of the Physics community. This particular role is currently available in the Physics community and is currently a member of the Physics community.
                    </Text>
                    <MyTag tagLabel="Physics" color="blue" />
                    <Flex w="100%" justifyContent={"flex-end"}>
                        <Button variant={"ghost"} color={"gray.600"} size="sm" rightIcon={<TfiArrowCircleRight />} >View Tutor Profile</Button>
                    </Flex>
                </Flex>
                {/* <Card
                    width={"100%"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    direction={"column"}
                    p="10px"
                    gap="10px"
                    boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                    bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                    mt={"20px"}
                >
                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"70%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                            <Flex direction={"column"} gap={"5px"}>
                                <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"left"}>Class Forum</Text>
                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Introducing Class Forums.Discuss your matters with your Friends and Tutor </Text>
                            </Flex>
                            <Button variant="solid" bg={"accent"} color={"white"} size="sm" width={"max-content"} onClick={onGuideLineOpen}>Read Rules</Button>
                        </Flex>
                        <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} />
                    </Flex>
                </Card> */}
                {/* <Flex direction={"column"} mt="20px" gap="0px" width={"100%"}>
                    <Text fontWeight={"medium"} fontSize={"16px"} color="gray.600">Forum Stats</Text>
                    <Flex direction={"row"} gap="20px" width={"100%"} pt="5px" px="10px" justifyContent={"flex-start"} alignItems={"center"}>
                        <MiniStat name="Participants" value="03" endContent={<MiniStatCardIcon color={"blue"} icon={FaUsers} />} />
                        <MiniStat name="Posts" value={forumDetails.post_count} endContent={<MiniStatCardIcon color={"purple"} icon={BsPostcardHeartFill} />} />
                    </Flex>
                </Flex> */}
            </Flex>
            <Flex width={"100%"} px="20px" mt="10px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                <Text fontWeight={"bold"} fontSize={"20px"} color="gray.600">Enrollment</Text>
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
                    <Box
                        backgroundColor="gray.100"
                        borderRadius="8px"
                        padding="10px"
                    >
                        <Text fontWeight={"medium"} fontSize={"16px"} color="gray.800" textAlign={"left"}>
                            What happens when you enroll:
                        </Text>
                        <Text fontSize={"14px"} color="gray.600" textAlign={"left"} fontWeight={400} marginTop="6px">
                            <Icon as={FaRegCalendarCheck} mr="2" />
                            Gain access to course announcements and notifications.
                        </Text>
                        <Text fontSize={"14px"} color="gray.600" textAlign={"left"} fontWeight={400} marginTop="6px">
                            <Icon as={AiOutlineClockCircle} mr="2" />
                            Access public course content immediately.
                        </Text>
                        <Text fontSize={"14px"} color="gray.600" textAlign={"left"} fontWeight={400} marginTop="6px">
                            <Icon as={AiOutlineClockCircle} mr="2" />
                            Full course access upon payment.
                        </Text>
                    </Box>

                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"100%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                            {/* <Flex direction={"column"} gap={"5px"}> */}
                            {/* <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"center"}>Class Status</Text> */}
                            <Flex diection="row" justifyContent={"center"} alignItems={"center"} gap={10}>
                                <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Started On</Text>
                                    <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                        <FaRegCalendarCheck size={"20px"} color="gray.600" />
                                        <Flex gap="0" direction={"column"}>
                                            <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>SEP 2023</Text>
                                            {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Box h="100%" w="2px" bg={"gray.50"} />
                                <Flex direction={"column"} gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Duration</Text>
                                    <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                        <AiOutlineClockCircle size={"20px"} color="gray.600" />
                                        <Flex gap="0" direction={"column"}>
                                            <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>2 Years</Text>
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
                                    <Button variant="solid" bg={"accent"} color={"white"} size="md" w="100%" onClick={navigateToMyCourses}>VIEW COURSE</Button>
                                </> :
                                <Button variant="solid" bg={"accent"} color={"white"} size="md" w="100%" onClick={onAreYouSureOpen}>ENROLL NOW</Button>
                            }
                        </Flex>
                        {/* <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} /> */}
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    )

}

export default RightPanelCourseViewNotEnrolled