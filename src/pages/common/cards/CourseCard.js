import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";

import CourseImage from "../../../assests/images/course.png";
import ProfileImage from "../../../assests/images/profile.jpg";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <Link to={`/stu/courses/eaea8414-d4ec-4d26-8882-203b4efa6419`}>
      <Box
        m={2}
        boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
        borderRadius={8}
      >
        <Image w={"100%"} h={195} src={CourseImage} borderRadius={5} />
        <Box p={3}>
          <Box>
            <Text mt={2} fontSize={"1.2rem"} fontWeight={"bold"}>
              {course.courseName}
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
            <Avatar size={"md"} name='Ryan Florence' src={ProfileImage} />
            <Flex width={"100%"} justifyContent={"center"} alignItems={"flex-start"} direction={"column"} gap="0px">
              <Text fontWeight={"semibold"} fontSize={"14px"} color="gray.600" noOfLines={1}>{course.tutorName}</Text>
              <Text fontWeight={"medium"} fontSize={"12px"} color="gray.600" noOfLines={1}>{course.tutorDegree}</Text>
            </Flex>
          </Flex>
          <Flex mt={2.5} ml={5} alignItems={"baseline"}>
            <Text fontSize={"0.9rem"}>Rs.</Text>
            <Text fontSize={"1rem"} fontWeight={"bold"}>
              {course.fee}
            </Text>
            <Text fontSize={"0.95rem"}>/month</Text>
          </Flex>
          <Button
            mt={3}
            w={"100%"}
            style={{
              background: "#0074D9",
              color: "#FFFFFF",
              _hover: {
                bg: "#0074D9",
                color: "#FFFFFF",
              },
              fontWeight: "normal",
            }}
          >
            Enroll
          </Button>
        </Box>
      </Box>
    </Link >
  );
}

export default CourseCard;
