import {
  Container,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";

export default function CategoriesHeaderhBar({ search , setSearch }) {
  return (
      <HStack
        // marginBottom="10px"
        marginTop="20px"
        maxWidth="1250px"
        padding="10px"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl>
            <InputGroup
              borderColor="#E0E1E7"
              // h={"60px"}
              maxWidth={{ base: "200px" }}
              minWidth={{ base: "160px", md: "300px", lg: "400px" }}
              marginLeft={{ base: "10px", lg: "30px" }}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<HiSearch h="50px" color="gray" />}
                h={"max-content"}
                w={"max-content"}
                p="13px"
              />
              <Input
                variant="filled"
                placeholder="Search"
                h={"40px"}
                size="sm"
                fontSize="16px"
                borderRadius={"10px"}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <InputRightElement
                fontSize="22px"
                children={
                  <IoIosCloseCircle h="50px" color="gray" cursor="pointer" />
                }
                h={"40px"}
                w={"40px"}
                onClick={() => {
                  setSearch("");
                }}
              />
            </InputGroup>
          </FormControl>
        </form>

        <Spacer minwidth="10px" />

        <NavLink to="add">
          <Button
            colorScheme="whatsapp"
            variant="solid"
            // position="relative"
            // top="47px"
            size="md"
            width="160px"
            // left={{ base: "120px", md: "250px", lg: "500px", xl: "1050px" }}
          >
            <AddIcon boxSize={5} pr="7px" color="white" />
            Add Category
          </Button>
        </NavLink>
      </HStack>

  );
}
