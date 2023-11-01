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
import { IoCloseCircleSharp } from "react-icons/io5";
import { IconSearch } from "@tabler/icons-react";
import { FaUserFriends } from "react-icons/fa";



export default function AttendanceHeaderBar({ search, setSearch, filter, setFilter }) {
  return (
    <Grid
      margin={{ base: "5px 5px", sm: "20px auto" }}
      maxWidth="1200px"
      padding="5px"
      templateColumns="repeat(6, 1fr)"
      gap={{ base: 3, sm: 10 }}
    >
      <GridItem colSpan={{ base: 5, sm: 4 }}>
        <FormControl>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              fontSize="12px"
              pb="3px"
              children={<IconSearch size="1rem" color="gray" />}
            />

            <Input
              variant="outline"
              placeholder="Search by name"
              paddingLeft="35px"
              h={"35px"}
              size="sm"
              fontSize={{ base: "14px", sm: "14px" }}
              borderRadius={"5px"}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <InputRightElement
              fontSize="22px"
              pb="6px"
              children={
                <IoCloseCircleSharp h="40px" color="gray" cursor="pointer" />
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
              children={<FaUserFriends size="1.1rem" color="gray" />}
            />

            <Input
              as={Select}
              variant="outline"
              color="gray"
              paddingLeft="40px"
              fontSize="14px"
              h={"35px"}
              size="sm"
              borderRadius={"5px"}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="All Students">All Students</option>
              <option value="Present">Present Students</option>
              <option value="Absent">Absent Students</option>
            </Input>
          </InputGroup>
        </FormControl>
      </GridItem>
    </Grid>
  );
}
