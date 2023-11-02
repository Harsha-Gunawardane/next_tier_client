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



export default function StaffHeaderBar({ search, setSearch, filter, setFilter, onOpen}) {


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
              paddingLeft="35px"
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
            />

            <Input
              as={Select}
              variant="outline"
              color="gray"
              paddingLeft="40px"
              fontSize="14px"
              h={"40px"}
              size="sm"
              borderRadius={"5px"}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="All Staff">All Staff</option>
              <option value="Paper Marking Staff">Paper Marking Staff</option>
              <option value="Cls Supporting Staff">
                Class Supporting Staff
              </option>
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
