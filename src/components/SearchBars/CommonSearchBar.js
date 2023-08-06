import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";

export default function CommonSearchBar({ search , setSearch}) {
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
          variant="filled"
          placeholder="Search"
          h={"40px"}
          size="sm"
          fontSize="16px"
          bg="gray.50"
          borderRadius={"10px"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <InputRightElement
          fontSize="22px"
          children={<IoIosCloseCircle h="50px" color="gray" cursor="pointer" />}
          h={"40px"}
          w={"40px"}
          onClick={() => {
            setSearch("");
          }}
        />
      </InputGroup>
    </FormControl>
  </form>;
}

