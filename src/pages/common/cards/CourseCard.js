import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";

import CourseImage from "../../../assests/images/course.png";
import ProfileImage from "../../../assests/images/profile.jpg";

function CourseCard({ course }) {
  return (
    <Box
      w={330}
      h={415}
      m={2}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
      borderRadius={8}
    >
      <Image w={"100%"} h={195} src={CourseImage} borderRadius={5} />
      <Box p={3}>
        <Box>
          <Text mt={2} fontSize={20} fontWeight={"bold"}>
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
        <Box mt={3}>
          <Flex gap={3}>
            <Image
              objectFit={"cover"}
              w={14}
              h={14}
              borderRadius={"50%"}
              src={ProfileImage}
            />
            <Box>
              <Text fontSize={18} fontWeight={"semibold"}>
                {course.tutorName}
              </Text>
              <Text fontSize={12}>{course.tutorDegree}</Text>
            </Box>
          </Flex>
        </Box>
        <Flex mt={2.5} ml={5} alignItems={"baseline"}>
          <Text fontSize={13}>Rs.</Text>
          <Text fontSize={16} fontWeight={"bold"}>
            {course.fee}
          </Text>
          <Text fontSize={13}>/month</Text>
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
  );
}

export default CourseCard;
