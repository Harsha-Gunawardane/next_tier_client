import React from "react";

import {
  Text,
  Box,
} from "@chakra-ui/react";

import CourseCardToday from "../../components/tutor/attendance/CourseCardToday.js";
import CourseCard from "../../components/tutor/attendance/CourseCard.js";

const SelectAttendance = () => {

  return (
    <Box w="100%">
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        // paddingTop="5px"
      >
        Today Classes
      </Text>
        <CourseCardToday />
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        paddingTop="10px"
        paddingBottom="10px"
      >
        All Classes
      </Text>
      <CourseCard/>
    </Box>
  );
};

export default SelectAttendance;
