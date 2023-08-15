import { Flex } from "@chakra-ui/react";
import React from "react";

function Qualification({ qualification }) {
  return (
    <Flex
      border={"1px solid #555555"}
      borderLeft={"5px solid #555555"}
      borderRadius={4}
      w={"100%"}
      p={2}
      mt={1}
      mb={2}
      boxShadow="rgba(255, 110, 136, 0.15) 0px 3px 6px -1px, rgba(0, 0, 0, 0.1) 0px 3px 4px"
      fontSize={13}
    >
      {qualification}
    </Flex>
  );
}

export default Qualification;
