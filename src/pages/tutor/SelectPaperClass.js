import React from "react";

import { Text, Box } from "@chakra-ui/react";
import CourseCardPaper from "../../components/tutor/paper/CourseCardPaper";


const SelectPaperClass = () => {
  return (
    <Box w="100%">
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        paddingTop="10px"
        paddingBottom="15px"
      >
        Paper Classes
      </Text>
      <CourseCardPaper />
    </Box>
  );
};

export default SelectPaperClass;
