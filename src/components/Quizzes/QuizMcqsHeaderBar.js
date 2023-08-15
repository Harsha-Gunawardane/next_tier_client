import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IconSearch } from "@tabler/icons-react";
import { BiBook } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

// import SearchBarOne from "../SearchBars/SearchBarOne";

export default function QuizMcqsHeaderBar({ search, setSearch, handleDrawer, onOpen }) {
  return (
    <Grid
      margin={{ base: "5px 5px", sm: "20px auto" }}
      maxWidth="1200px"
      padding="5px"
      templateColumns="repeat(7, 1fr)"
      gap={{ base: 3, sm: 20 }}
    >
      <GridItem colSpan={{ base: 4, sm: 3 }}>
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px"
              children={<IconSearch size="1.3rem" color="gray" />}
            />

            <Input
              variant="outline"
              placeholder="Search added question"
              h={"40px"}
              size="sm"
              fontSize={{ base: "14px", sm: "16px" }}
              borderRadius={"5px"}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <InputRightElement
              fontSize="22px"
              children={
                <IoCloseCircleSharp h="50px" color="gray" cursor="pointer" />
              }
              h={"40px"}
              w={"40px"}
              onClick={() => {
                setSearch("");
              }}
            />
          </InputGroup>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 3, sm: 3 }}>
       
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px"
              children={<IconSearch size="1.3rem" color="gray" />}
            />

            <Input
              variant="outline"
              placeholder="Teleport mcqs from the question library"
              h={"40px"}
              size="sm"
              fontSize={{ base: "14px", sm: "16px" }}
              borderRadius={"5px"}
              onClick={handleDrawer}
            />
          </InputGroup>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 6, sm: 1 }} justifySelf={{ base: "end" }}>
        <Button colorScheme="messenger" variant="solid" size="md" width="160px" onClick={onOpen}>
          <IoIosAddCircleOutline
            size="20px"
            color="white"
            style={{ marginRight: "6px" }}
          />
          New mcq
        </Button>
      </GridItem>
    </Grid>
  );
}


