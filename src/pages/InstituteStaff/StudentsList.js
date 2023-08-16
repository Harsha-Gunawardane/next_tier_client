import {
  Box,
  SimpleGrid,
  Text,
  Input,
  Spacer,
  Select,
  Flex,
  Avatar,
  Button,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import data from "./data/data.json";
import { useNavigate } from "react-router-dom";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
// } from "@chakra-ui/react";

const stuData = data.Students;

function StudentsList() {
  const scrollbarStyles = `
    /* your scrollbar styles here */
  `;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("fName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterBy, setFilterBy] = useState("");
  const [filterByGender, setFilterByGender] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleFilterByGenderChange = (event) => {
    setFilterByGender(event.target.value);
  };

  const filteredStu = stuData.filter(
    (stu) =>
      (stu.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stu.lName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterBy === "" ||
        stu.stream.toLowerCase() === filterBy.toLowerCase()) &&
      (filterByGender === "" ||
        stu.gender.toLowerCase() === filterByGender.toLowerCase())
  );

  const sortedStu = filteredStu.sort((a, b) => {
    let compareValue = 0;
    if (sortBy === "fName") {
      compareValue = a.fName.localeCompare(b.fName);
    } else if (sortBy === "lName") {
      compareValue = a.lName.localeCompare(b.lName);
    } else if (sortBy === "joinedDate") {
      compareValue = new Date(a.joinedDate) - new Date(b.joinedDate);
    }
    return compareValue * (sortOrder === "asc" ? 1 : -1);
  });

  const navigate = useNavigate();

  const handleViewProfile = (stuId) => {
    // history.push(`/staff/profile/${staffId}`);
    // With this:
    navigate(`/staff/stu-profile/${stuId}`);
  };

  // Get total count of students for each filter option
  const totalCount = {
    all: stuData.length,
    Mathematics: stuData.filter((stu) => stu.stream === "Mathematics").length,
    Commerce: stuData.filter((stu) => stu.stream === "Commerce").length,
    Biology: stuData.filter((stu) => stu.stream === "Biology").length,
    Arts: stuData.filter((stu) => stu.stream === "Arts").length,
    Male: stuData.filter((stu) => stu.gender === "Male").length,
    Female: stuData.filter((stu) => stu.gender === "Female").length,
  };

  return (
    <Box backgroundColor="white" width="100%">
      {/* <Box>
        <Text>Students List</Text>
      </Box> */}
      {/* <SimpleGrid p="10px" columns={5} ml={4} mr={4} minChildWidth={200}> */}
        {/* Search Box */}
        {/* <Box height="40px">
          <Input
            width="300px"
            placeholder="Search for students"
            value={searchTerm}
            onChange={handleSearchInputChange}
            mb={["2", "0"]}
            fontSize={13}
            backgroundColor="white"
          />
        </Box> */}
        {/* Sort and Filter Options */}
        {/* <Box height="40px">
          <Flex paddingLeft={7}>
            <Box>
              <Text mr="2" fontSize={13} marginTop={2}>
                Sort By:
              </Text>
            </Box>
            <Box>
              <Select
                fontSize={13}
                backgroundColor="white"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="fName">First Name</option>
                <option value="lName">Last Name</option>
                <option value="joinedDate">Joined Date</option>
              </Select>
              <Spacer mx="2" />
            </Box>
          </Flex>
        </Box> */}

        {/* <Box height="40px">
          <Flex paddingLeft={7} paddingRight={0}>
            <Box>
              <Text mr="2" fontSize={13} marginTop={2}>
                Sort Order:
              </Text>
            </Box>
            <Box>
              <Select
                fontSize={13}
                backgroundColor="white"
                value={sortOrder}
                onChange={handleSortOrderChange}
                w="max-content"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Box>
          </Flex>
        </Box> */}

        {/* <Box height="40px">
          <Flex>
            <Box>
              <Text mr="2" fontSize={13} marginTop={2}>
                Gender:
              </Text>
            </Box>
            <Box>
              <Select
                fontSize={13}
                w="max-content"
                backgroundColor="white"
                value={filterByGender}
                onChange={handleFilterByGenderChange}
              >
                <option value="">All ({totalCount.all})</option>
                <option value="Male">Male ({totalCount.Male})</option>
                <option value="Female">Female ({totalCount.Female})</option>
              </Select>
            </Box>
          </Flex>
        </Box> */}

        {/* <Box height="40px" overflowX="hidden">
          <Flex>
            <Box>
              <Text mr="2" fontSize={13} marginTop={2}>
                Stream:
              </Text>
            </Box>
            <Box>
              <Select
                fontSize={13}
                w="max-content"
                backgroundColor="white"
                value={filterBy}
                onChange={handleFilterByChange}
              >
                <option value="">All ({totalCount.all})</option>
                <option value="Biology">Biology ({totalCount.Biology})</option>
                <option value="Mathematics">
                  Mathematics ({totalCount.Mathematics})
                </option>
                <option value="Arts">Arts ({totalCount.Arts})</option>
                <option value="Commerce">
                  Commerce ({totalCount.Commerce})
                </option>
              </Select>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid> */}

      {/* Student List */}
      <Box
        width="100%"
        height="79.2vh"
        // overflowY="scroll"
        // css={scrollbarStyles}
      >
        <SimpleGrid
          columns={[1, 2, 3,4]}
          spacing="6"
          marginLeft={4}
          marginRight={4}
        >
          {sortedStu.map((stu) => (
            <Box
              key={stu.id}
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              shadow="md"
              bg="white"
              mb="1"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar src={stu.profileImage} mb="2" size="xl" />
              <Text fontWeight="bold" fontSize={13}>
                {stu.fName} {stu.lName}
              </Text>
              <Text fontSize={13}>{stu.gender}</Text>
              <Badge
                colorScheme={
                  stu.stream === "Mathematics"
                    ? "red"
                    : stu.stream === "Biology"
                    ? "green"
                    : stu.stream === "Arts"
                    ? "teal"
                    : "orange"
                }
              >
                <Text fontSize={13}>{stu.stream}</Text>
              </Badge>
              <Text fontSize={13}>Joined Date: {stu.joinedDate}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                marginTop={2}
                onClick={() => handleViewProfile(stu.stu_id)}
              >
                View Profile
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default StudentsList;
