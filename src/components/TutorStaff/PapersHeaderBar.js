import { FormControl, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Spacer } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";

export default function PapersHeaderBar({ search, setSearch, onOpen }) {
  return (
    <HStack marginBottom="8px" maxWidth="1250px" padding="10px">
      {/* <CommonSearchBar search={search} setSearch={setSearch} /> */}
      <form>
        <FormControl>
          <InputGroup
            borderColor="#E0E1E7"
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
              variant="outline"
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
      <Button
        colorScheme="messenger"
        variant="solid"
        size="md"
        width="160px"
        fontSize="16px"
        marginRight={{ base: "0px", sm: "25px" }}
        onClick={onOpen}
      >
        Add a paper
      </Button>
    </HStack>
  );
}
