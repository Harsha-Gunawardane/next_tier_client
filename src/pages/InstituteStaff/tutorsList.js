import { useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Badge
} from "@chakra-ui/react";
import data from "./data/data.json";
import { useNavigate } from "react-router-dom";

const tutorData = data.Tutors;

const TutorsList = () => {
  const scrollbarStyles = `
    /* your scrollbar styles here */
  `;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("fName");
  const [sortOrder, setSortOrder] = useState("asc");
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

  const handleFilterByGenderChange = (event) => {
    setFilterByGender(event.target.value);
  };

  const filteredTutors = tutorData.filter(
    (tutor) =>
      (tutor.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.lName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterByGender === "" || tutor.gender === filterByGender)
  );

  const sortedTutors = filteredTutors.sort((a, b) => {
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

  const handleViewProfile = (tutorId) => {
    navigate(`/staff/tutor-profile/${tutorId}`);
  };

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Box>
        <Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">
          Tutors
        </Text>
      </Box>
      <Box>
        <SimpleGrid p="10px" columns={4} spacing={6} minChildWidth={250}>
          <Box height="40px">
            <Input
              placeholder="Search for Tutors"
              mb={['2', '0']}
              fontSize={13}
              backgroundColor="white"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Box>
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort By:
                </Text>
              </Box>
              <Box>
                <Select fontSize={13} backgroundColor="white" value={sortBy} onChange={handleSortByChange}>
                  <option value="fName">First Name</option>
                  <option value="lName">Last Name</option>
                  <option value="joinedDate">Joined Date</option>
                </Select>
                <Spacer mx="2" />
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort Order:
                </Text>
              </Box>
              <Box>
                <Select
                  w="max-content"
                  fontSize={13}
                  backgroundColor="white"
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Select>
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Filter By gender:
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
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
      <Box width="100%" height="72vh" overflowY="scroll" css={scrollbarStyles}>
        <SimpleGrid
          columns={[1, 2, 3, 4, 5]}
          spacing="6"
          marginLeft={4}
          marginRight={4}
        >
          {sortedTutors.map((tutor) => (
            <Box
              key={tutor.tutor_id}
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
              <Avatar src={tutor.profileImage} mb="2" size="xl" />
              <Text fontWeight="bold" fontSize={13}>
                {tutor.fName} {tutor.lName}
              </Text>
              {/* <Text fontSize={13}>{tutor.gender}</Text> */}
              <Text fontSize={10} color="gray">{tutor.education.qualifications}</Text>
              <Text fontSize={13}>Joined Date: {tutor.joinedDate}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                marginTop={2}
                onClick={() => handleViewProfile(tutor.tutor_id)}
              >
                View Profile
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default TutorsList;
