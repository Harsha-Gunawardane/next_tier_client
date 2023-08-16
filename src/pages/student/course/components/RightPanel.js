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

import rulesImg from "../../../../assests/images/rules2.png"
import { TfiArrowCircleRight } from "react-icons/tfi"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import MiniStat from "../../../../components/Card/MiniStat"
import MiniStatCardIcon from "../../../../components/icons/MiniStatCardIcon"
import { BiBook } from "react-icons/bi"
import { FaUsers } from "react-icons/fa6"
import { BsPostcardHeartFill } from "react-icons/bs"

const RightPanel = (props) => {

    const { forumDetails } = props
    const { courseDetails } = useOutletContext

    useEffect(() => {
        console.log(forumDetails)
    }, [])


    return (
        <Flex gap="10px" direction={"column"}>
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                <Text fontWeight={"medium"} fontSize={"16px"} color="gray.600">Forum Overview</Text>
            </Flex>
            <Flex width={"100%"} px="20px" justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} gap={"10px"}>
                <AspectRatio ratio={4 / 1} w="100%" borderRadius={"10px"} overflow={"hidden"}>
                    <Image src="https://www.picsum.photos/400/100" alt="Segun Adebayo" />
                </AspectRatio>
                {/* forum title */}
                <Text fontWeight={"bold"} fontSize={"20px"} color="gray.800" mt="10px" align={"left"} noOfLines={1}>{forumDetails.title}</Text>
                {/* tutor name with avatar left and tutor qualification right bottom */}
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px">
                    <Avatar size={"md"} name='Ryan Florence' src="https://www.picsum.photos/400/400" />
                    <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"14px"} color="gray.600">{forumDetails.course.tutor.name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600">BSc. in Physics</Text>
                    </Flex>
                </Flex>
                {/* card to display adhere to te rules and small warning and button to vide rules. colorfull card adapt to the theme and have a image svg illustratable  */}
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
                                <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"left"}>Follow Forum Rules</Text>
                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Click to learn how to participate responsibly and respectfully in our student community forum.</Text>
                            </Flex>
                            <Button variant="solid" bg={"accent"} color={"white"} size="sm" width={"max-content"} >Read Rules</Button>
                        </Flex>
                        {/* <Flex width={"40%"} overflow={"visible"} position={"relative"}> */}
                        <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} />
                        {/* </Flex> */}
                    </Flex>
                </Card>
                <Flex direction={"column"} mt="20px" gap="0px" width={"100%"}>
                    <Text fontWeight={"medium"} fontSize={"16px"} color="gray.600">Forum Stats</Text>
                    <Flex direction={"row"} gap="20px" width={"100%"} pt="5px" px="10px" justifyContent={"flex-start"} alignItems={"center"}>
                        <MiniStat name="Participants" value="03" endContent={<MiniStatCardIcon color={"blue"} icon={FaUsers} />} />
                        <MiniStat name="Posts" value={forumDetails.post_count} endContent={<MiniStatCardIcon color={"purple"} icon={BsPostcardHeartFill} />} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )

}

export default RightPanel