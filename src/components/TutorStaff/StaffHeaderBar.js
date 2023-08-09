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
import { FaUserFriends } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IconSearch } from "@tabler/icons-react";
import { IoIosAddCircleOutline } from "react-icons/io";

// import SearchBarOne from "../SearchBars/SearchBarOne";

// import { Form } from "react-router-dom";

export default function StaffHeaderBar({ search, setSearch, onOpen }) {

  // const staffs = useStaffStore((state) => state.staffs);

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
              fontSize="12px"
              children={<IconSearch size="1.3rem" color="gray" />}
            />

            <Input
              variant="outline"
              placeholder="Search by name"
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

      <GridItem colSpan={{ base: 1, sm: 2 }}>
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px"
              children={<FaUserFriends size="1.2rem" color="gray" />}
              paddingRight="7px"
            />

            <Input
              as={Select}
              placeholder="All Staff"
              variant="outline"
              color="gray"
              fontSize="14px"
              h={"40px"}
              size="sm"
              borderRadius={"5px"}
            >
              <option value="option1">Paper Marking Staff</option>
              <option value="option2">Class Supporting Staff</option>
            </Input>
          </InputGroup>
        </FormControl>
      </GridItem>

      <GridItem colSpan={{ base: 6, sm: 1 }} justifySelf="end">
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
          New staff
        </Button>
      </GridItem>
    </Grid>
  );
}
