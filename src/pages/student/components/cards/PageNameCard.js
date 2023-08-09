import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import { BiSolidFile } from "react-icons/bi";

function PageNameCard({ name, ml, onClickHandle }) {

  return (
    <Flex
      alignItems={"center"}
      color={"#444444"}
      gap={4}
      w={'65%'}
      ml={ml}
      mb={1}
      cursor={'pointer'}
      onClick={onClickHandle}
    >
      <BiSolidFile />
      <Text fontSize={14}>{name}</Text>
    </Flex>
  );
}

export default PageNameCard;
