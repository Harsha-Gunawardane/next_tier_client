import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function AttendDate({ date, attended }) {
  return (
    <Box w={"25%"}>
      <Flex
        justifyContent={"center"}
        fontSize={{
          base: "16px",
          lg: "14px",
        }}
      >
        {date}
      </Flex>
      <Flex justifyContent={"center"} alignItems={"center"} gap={1} mt={2}>
        <Box w={"40%"} h={1} bg={"#E9E9E9"} borderRadius={3}></Box>
        <Box
          w={{
            base: 9,
            lg: 6,
          }}
          h={{
            base: 9,
            lg: 6,
          }}
          borderRadius={"50%"}
          bg={attended ? "#C4FFC3" : "#F5D6D3"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {attended ? (
            <MdDone
              color="#04D900"
              fontSize={{
                base: 24,
                lg: 16,
              }}
              fontWeight={"bold"}
            />
          ) : (
            <AiOutlineClose
              color="#D93400"
              fontSize={{
                base: 24,
                lg: 16,
              }}
              fontWeight={"bold"}
            />
          )}
        </Box>
        <Box w={"40%"} h={1} bg={"#E9E9E9"} borderRadius={3}></Box>
      </Flex>
    </Box>
  );
}

export default AttendDate;
