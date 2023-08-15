import {
  FormControl,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
// import SearchBarOne from "../SearchBars/SearchBarOne";

export default function McqsHeaderBar({ search, setSearch, onOpen }) {
  return (
    <Grid
      margin={{ base: "5px 5px", sm: "20px auto" }}
      maxWidth="1200px"
      padding="5px"
      templateColumns="repeat(6, 1fr)"
      gap={{ base: 3, sm: 20 }}
    >
      <GridItem colSpan={{ base: 5, sm: 3 }}>
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px" // Decrease the font size to make the icon smaller
              children={<IconSearch size="1.3rem" color="gray" />}
            />

            <Input
              variant="outline"
              placeholder="Search"
              h={"40px"}
              size="sm"
              fontSize={{ base: "14px", sm: "16px" }}
              borderRadius={"5px"}
              paddingLeft="35px"
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

      <GridItem colSpan={{ base: 1, sm: 2 }}>
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px"
              children={<BiBook size="1.3rem" color="gray" />}
              // display={{ base: "none", md:"block" }}
            />

            <Input
              as={Select}
              placeholder="All Subject Areas"
              variant="outline"
              color="gray"
              fontSize={{ base: "14px", sm: "16px" }}
              h={"40px"}
              size="sm"
              borderRadius={"5px"}
              paddingLeft="35px"
            >
              <option value="option1">Inorganic</option>
              <option value="option2">Organic</option>
              <option value="option2">Calculation</option>
              <option value="option2">Atomicity</option>
            </Input>
          </InputGroup>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 6, sm: 1 }} justifySelf={{ base: "end" }}>
        <Button
          colorScheme="messenger"
          variant="solid"
          size="md"
          width="160px"
          onClick={onOpen}
        >
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
