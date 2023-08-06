import React, { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

//icons
import { HiSearch } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

const SearchBar = ({setPreviousQuizzes, search, setSearch}) => {

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <FormControl id="search" h="40px" width={"100%"}>
      <InputGroup borderRadius={"10px"}>
        <InputLeftElement pointerEvents="none" color={"gray.400"}>
          <HiSearch size="18px" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search"
          variant={"filled"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          borderRadius={"10px"}
        />
        <InputRightElement
          pointerEvents={"all"}
          display={search ? "block" : "none"}
          zIndex={90}
        >
          <IconButton
            variant={"link"}
            p={0}
            m={0}
            h={"100%"}
            color={"gray.400"}
            zIndex={90}
            _hover={{ color: "gray.600" }}
            onClick={() => {
              clearSearch();
            }}
          >
            <AiFillCloseCircle size={"18px"} />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default SearchBar;
