import {
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";

// import SearchBarOne from "../SearchBars/SearchBarOne";

// import { Form } from "react-router-dom";

export default function PaperMarkingHeaderBar({ search, setSearch }) {
  return (
    <HStack
      marginBottom="40px"
      marginTop="20px"
      maxWidth="1250px"
      padding="10px"
      justifyContent="center"
    >
      {/* <SearchBarOne search={search} setSearch={setSearch} /> */}
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
              fontSize="18px"
              children={<HiSearch boxSize={5} h="50px" color="gray" />}
              h={"40px"}
              w={"40px"}
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
    </HStack>
  );
}
