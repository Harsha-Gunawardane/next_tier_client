import { AspectRatio, Avatar, Box, Button, Flex, IconButton, Image, Select, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { FaMoneyBill, FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever, MdSchedule } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import periodString from "../../../../utils/periodString";
import { BiDislike, BiLike } from "react-icons/bi";
import { PiChatCircleTextBold } from "react-icons/pi";
import getDateString from "../../../../utils/getDateString";
import MyTag from "../../../common/components/MyTag";

//icons
import { RiDeleteBin6Line } from "react-icons/ri";
import countToString from "../../../../utils/countToString";

function VideoCard({ video }) {

    const navigate = useNavigate();

    const navigateTovideo = () => {
        navigate(`/tutor/videos/${video.id}`);
    }

    return (
        <Box
            m={2}
            boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
            borderRadius={8}
            maxW={"400px"}
            p="5px"
        >
            <Flex justifyContent={"center"} alignItems={"center"} direction={"row"} gap={4} p="5px">
                <AspectRatio ratio={16 / 9} minW={"100%"} >
                    <Image w={"100%"} h={195} src={video.thumbnail} borderRadius={5} objectFit={"cover"} />
                </AspectRatio>
            </Flex>
            <Box p={3}>
                <Text mt={1} fontSize={"1rem"} fontWeight={"bold"} noOfLines={1} color={"gray.800"}>
                    {video.title}
                </Text>
                <Text mt={1} fontSize={"0.8rem"} fontWeight={"normal"} noOfLines={2} color={"gray.500"}>
                    {video.description}
                </Text>
                <Flex
                    mt={2.5}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    direction={"row"}
                    gap={2}
                    color="gray.600"
                    overflow={"scroll"}
                    // hide scrollbar
                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',

                    }}
                >
                    <MyTag tagLabel={video.subject} color={"blue"} />
                    {
                        video.subject_areas.map((subject_area) => {
                            return (
                                <MyTag tagLabel={subject_area} color={"green"} />
                            )
                        })
                    }
                </Flex>
                <Text mt={1} fontSize={"0.8rem"} fontWeight={"semibold"} noOfLines={1} color={"gray.600"}>
                    Uploaded at: {getDateString(video.uploaded_at)}
                </Text>

                <Flex mt={2.5} justifyContent={"space-around"} alignItems={"center"} direction={"row"} gap={4} color="gray.600" borderRadius={"10px"} py="15px" bg="gray.100">
                    <Flex direction={"row"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <BiLike color="gray.400" fontSize={18} />
                        <Text fontSize={"0.8rem"} fontWeight={"bold"}>
                            {video._count.content_reactions}
                        </Text>
                    </Flex>
                    <Flex direction={"row"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <BiDislike color="gray.400" fontSize={18} />
                        <Text fontSize={"0.8rem"} fontWeight={"semibold"} noOfLines={1}>
                            {video._count.dislikes}
                        </Text>
                    </Flex>
                    <Flex direction={"row"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <PiChatCircleTextBold color="gray.400" fontSize={18} />
                        <Text fontSize={"0.8rem"} fontWeight={"bold"}>
                            {video._count.comments}
                        </Text>
                    </Flex>
                    <Flex direction={"row"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <AiOutlineEye color="gray.400" fontSize={18} />
                        <Text fontSize={"0.8rem"} fontWeight={"semibold"} noOfLines={1}>
                            {countToString(video._count.content_views)}
                        </Text>
                    </Flex>
                </Flex>
                <Flex mt={2.5} justifyContent={"space-between"} alignItems={"center"} direction={"row"} gap={4} color="gray.600" borderRadius={"10px"} p="5px" >
                    <Box>
                        <Select
                            size={"sm"}
                            value={video.status}
                        >
                            <option value='PAID'>PAID</option>
                            <option value='PUBLIC'>PUBLIC</option>
                            <option value='HOLD'>HOLDED</option>
                        </Select>
                    </Box>

                    <Flex gap="5px">
                        {/* view and edit btn */}
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            size="sm"
                            onClick={navigateTovideo}
                            leftIcon={<FaRegEdit />}
                        >
                            View & Edit
                        </Button>

                        {/*delete button  */}
                        <IconButton
                            colorScheme="red"
                            aria-label="Delete"
                            size={"sm"}
                            icon={<RiDeleteBin6Line />}
                            onClick={() => { }}
                        />
                    </Flex>
                </Flex>

            </Box>
        </Box>
    )
}

export default VideoCard