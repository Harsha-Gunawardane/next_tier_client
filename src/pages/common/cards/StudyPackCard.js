import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import periodString from "../../../utils/periodString";

function StudyPackCard({ studyPack }) {

    const navigate = useNavigate();

    const navigateTostudyPack = () => {
        navigate(`/stu/studyPacks/${studyPack.id}`);
    }

    return (
        <Box
            m={2}
            boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
            borderRadius={8}
            maxW={"400px"}
        >
            <Image w={"100%"} h={195} src={studyPack.thumbnail} borderRadius={5} objectFit={"cover"} />
            <Box p={3}>
                <Box>
                    <Text mt={2} fontSize={"1.2rem"} fontWeight={"bold"}>
                        {studyPack.title}
                    </Text>
                    <Flex gap={1.5}>
                        <Flex>
                            <AiFillStar color="#FFD600" fontSize={12} />
                            <AiFillStar color="#FFD600" fontSize={12} />
                            <AiFillStar color="#FFD600" fontSize={12} />
                            <AiFillStar color="#FFD600" fontSize={12} />
                            <AiFillStar color="#FFD600" fontSize={12} />
                        </Flex>
                        <Text fontSize={11} color={"#C9C9C9"}>
                            4.5(210)
                        </Text>
                    </Flex>
                </Box>
                <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"} direction={"row"} mt="5px" gap="10px">
                    <Avatar h="34px" w="34px" name='Ryan Florence' src={studyPack.tutor.user.profile_picture} />
                    <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
                        <Text fontWeight={"semibold"} fontSize={"14px"} color="gray.600" noOfLines={1}>Mr. {studyPack.tutor.user.first_name} {studyPack.tutor.user.last_name}</Text>
                        <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600" noOfLines={1}>{studyPack.tutor.qualifications[0]}</Text>
                    </Flex>
                </Flex>
                <Flex mt={2.5} justifyContent={"space-around"} alignItems={"center"} direction={"row"} gap={4} color="gray.600">
                    <Flex alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <FaMoneyBill color="gray.400" fontSize={20} />
                        <Text fontSize={"0.8rem"}>Rs.</Text>
                        <Text fontSize={"0.9rem"} fontWeight={"bold"}>
                            {studyPack.price}
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={1} justifyContent={"flex-start"}>
                        <MdSchedule color="gray.400" fontSize={20} />
                        <Text fontSize={"0.9rem"} fontWeight={"semibold"} noOfLines={1}>
                            {periodString(studyPack.access_period)}
                        </Text>
                    </Flex>
                </Flex>
                <Button
                    mt={3}
                    w={"100%"}
                    style={{
                        background: "#0074D9",
                        color: "#FFFFFF",
                        fontWeight: "normal",
                    }}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}
                    onClick={navigateTostudyPack}
                >
                    Purchase
                </Button>
            </Box>
        </Box>
    )
}

export default StudyPackCard
