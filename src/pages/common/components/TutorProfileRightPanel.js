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


import rulesImg from "../../../assests/images/rules2.png"
import { TfiArrowCircleRight } from "react-icons/tfi"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MiniStat from "../../../components/Card/MiniStat"
import MiniStatCardIcon from "../../../components/icons/MiniStatCardIcon"
import { BiBook } from "react-icons/bi"
import { FaRegCalendarCheck, FaUsers } from "react-icons/fa6"
import { BsPostcardHeartFill } from "react-icons/bs"
import MyTag from "../../common/components/MyTag"
import { AiOutlineClockCircle } from "react-icons/ai"
import { Spoiler } from "@mantine/core";

const TutorProfileRightPanel = (props) => {

    const { courseTutorDetails, enrolled } = props
    const courseId = useParams().tutorId


    const [tutorDetails, setTutorDetails] = useState(courseTutorDetails)

    useEffect(() => {
        console.log("right panel loaded")
    })

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
                <AspectRatio ratio={4 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                    <Image src={tutorDetails.cover} alt="Segun Adebayo" />
                </AspectRatio>
                {/* forum title */}
                {/* <Text fontWeight={"bold"} fontSize={"20px"} color="gray.800" mt="10px" align={"left"} noOfLines={1}>{tutorDetails.title}</Text> */}
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px" height={"min-content"}>
                    <Avatar size={"lg"} name='Ryan Florence' src={tutorDetails.user.profile_picture} />
                    <Flex width={"100%"} justifyContent={"flex-end"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"16px"} color="gray.800">Mr. {tutorDetails.user.first_name} {tutorDetails.user.last_name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600">{tutorDetails.qualifications[0]}</Text>
                    </Flex>
                </Flex>
                <Flex w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={3}>
                    <Box>
                        <Text fontSize={"16px"} color={"gray.800"}>
                            Description
                        </Text>
                        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                            <Text fontSize={"14px"} color="gray.500" >
                                {tutorDetails.description}
                            </Text>
                        </Spoiler>
                    </Box>
                    {/* flex should get into new line when overflowed */}
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap="10px" >
                        <Flex mt={"2px"} direction={"column"}>
                            <Text fontSize={"16px"} color={"gray.800"}>Subjects</Text>
                            <Flex gap="5px" flexWrap="wrap" width="100%">
                                {tutorDetails.subjects.map((subject, index) => (
                                    <MyTag tagLabel={subject} color="blue" />
                                ))}
                            </Flex>
                        </Flex>
                        <Flex mt={"2px"} direction={"column"}>
                            <Text fontSize={"16px"} color={"gray.800"}>Grades</Text>
                            <Flex gap="5px" flexWrap="wrap" width="100%">
                                {
                                    tutorDetails.courses.filter((course) => course.grade.id === tutorDetails.id).map((course, index) => (
                                        <MyTag tagLabel={course.title} color="green" />
                                    ))
                                }
                            </Flex>
                        </Flex>
                        <Flex mt={"2px"} direction={"column"}>
                            <Text fontSize={"16px"} color={"gray.800"}>Medium</Text>
                            {tutorDetails.medium.map((medium, index) => (
                                <MyTag tagLabel={medium} color="orange" />
                            )
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                {/* <Flex direction={"column"} mt="20px" gap="0px" width={"100%"}>
                    <Text fontWeight={"medium"} fontSize={"16px"} color="gray.600">Forum Stats</Text>
                    <Flex direction={"row"} gap="20px" width={"100%"} pt="5px" px="10px" justifyContent={"flex-start"} alignItems={"center"}>
                        <MiniStat name="Participants" value="03" endContent={<MiniStatCardIcon color={"blue"} icon={FaUsers} />} />
                        <MiniStat name="Posts" value={forumDetails.post_count} endContent={<MiniStatCardIcon color={"purple"} icon={BsPostcardHeartFill} />} />
                    </Flex>
                </Flex> */}
            </Flex>
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>

            </Flex>
        </Flex>
    )

}

export default TutorProfileRightPanel;