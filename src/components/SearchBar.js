import React, { useEffect, useState } from 'react'
import { Flex, FormControl, InputGroup, InputLeftElement, Input, Box, InputRightElement, IconButton } from '@chakra-ui/react';

//icons
import { HiSearch } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

const SearchBar = (props) => {
    const { ...rest } = props;

    const [search, setSearch] = useState("");

    const clearSearch = () => {
        setSearch("");
    }

    return (
        <FormControl id="search" h="max-content" width={"300px"} alignContent={"center"} justifyContent={"center"} {...rest}>
            <InputGroup borderRadius={"10px"}>
                <InputLeftElement pointerEvents='none' color={"gray.400"} h="100%">
                    <HiSearch size="16px" />
                </InputLeftElement>
                <Input type='tel' placeholder='Search' variant={"filled"} value={search} onChange={(e) => { setSearch(e.target.value) }} borderRadius={"10px"} size={"sm"} />
                <InputRightElement pointerEvents={"all"} display={search ? "block" : "none"} zIndex={90} h={"100%"}>
                    <IconButton variant={"link"} p={0} m={0} h={"100%"} color={"gray.400"} zIndex={90} _hover={{ color: "gray.600" }} onClick={() => { clearSearch() }} >
                        <AiFillCloseCircle size={"16px"} />
                    </IconButton>
                </InputRightElement>
            </InputGroup>
        </FormControl >

    );
}


export default SearchBar;