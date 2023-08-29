import { useState,useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Switch,
  useToast,
} from "@chakra-ui/react";
// import data from "./data/data.json";
import { NavLink, useNavigate } from "react-router-dom";
import { SmallAddIcon } from "@chakra-ui/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// const tutorData = data.Tutors;

const TutorsList = () => {

  const axiosPrivate = useAxiosPrivate();
  const [tutorData, setTutorData] = useState([]);
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("fName");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/tutor");
        setTutorData(response.data);
      } catch (error) {
        console.error("Error fetching tutor details:", error);
        toast({
          title: "Error",
          description: "Error fetching tutor details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchTutorDetails();
  }, [toast]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredTutors = tutorData.filter((tutor) => {
    const fName = tutor.fName || "";
    const lName = tutor.lName || "";
    return (
      fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedTutors = filteredTutors.sort((a, b) => {
    let compareValue = 0;
    if (sortBy === "fName") {
      compareValue = (a.fName || "").localeCompare(b.fName || "");
    } else if (sortBy === "lName") {
      compareValue = (a.lName || "").localeCompare(b.lName || "");
    } else if (sortBy === "joinedDate") {
      compareValue = (
        new Date(a.joinedDate) - new Date(b.joinedDate)
      );
    }
    return compareValue * (sortOrder === "asc" ? 1 : -1);
  });

  const navigate = useNavigate();

  const handleViewProfile = (tutorId) => {
    navigate(`/staff/tutor-profile/${tutorId}`);
  };

  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
 
  const handleSwitchChange = (tutorId) => {
    const tutorToUpdate = tutorData.find((tutor) => tutor.tutor_id === tutorId);
    const newActiveState = !tutorToUpdate.active;

    // Update the tutor's active state
    tutorToUpdate.active = newActiveState;

    // Display appropriate toast based on the action
    if (newActiveState) {
      toast({
        title: "Tutor Enabled",
        description: `Tutor ${tutorToUpdate.fName} ${tutorToUpdate.lName} has been activated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Tutor Blocked",
        description: `Tutor ${tutorToUpdate.fName} ${tutorToUpdate.lName} has been blocked.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Box backgroundColor="#F9F9F9" width="100%"height="90vh">
      <Flex align="center" justify="space-between" p={4}>
        <Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">
          Tutors
        </Text>
        {/* <Link to="/staff/add-staff"> */}
        <NavLink to="add">
          <Button size="sm" mr={7} colorScheme="blue" mt={1}>
            <SmallAddIcon boxSize={5} />
            Add new tutor
          </Button>
        </NavLink>
      </Flex>
      <Box>
        <SimpleGrid p="10px" columns={5} spacing={6} minChildWidth={200} mr={10}>
          <Box height="40px" ml={7}>
            <Input
              placeholder="Search for Tutors"
              mb={["2", "0"]}
              fontSize={13}
              backgroundColor="white"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </Box>
          <Box height="40px"></Box>
          <Box height="40px"></Box>
          <Box height="40px">
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
        </SimpleGrid>
      </Box>

      <Box
        overflowX="auto"
        border="0.05px solid #DAE6F0"
        borderRadius={15}
        mx={10}
        mt={5}
        backgroundColor="white"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
              </Th>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
                Full Name
              </Th>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
                Email
              </Th>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
                Subjects
              </Th>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
                Action
              </Th>
              <Th fontSize={["10px", "13px", "md"]} textTransform="capitalize" fontWeight="bold">
                Active
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedTutors.map((tutor) => (
              <Tr key={tutor.tutor_id}>
                <Td>
                  
                  <Avatar src={tutor.profileImage} />
                </Td>
                <Td fontSize={["8px", "11px", "13px"]}>
                
                  {tutor.fName} {tutor.lName}
                </Td>
                <Td fontSize={["8px", "11px", "13px"]}> {tutor.email}</Td>
                <Td fontSize={["8px", "11px", "13px"]}>
                  {tutor.subjects ? tutor.subjects.join(", ") : ""}
                </Td>
                <Td>
                  <Flex direction={["row", "row"]} align="center">
                    <Button
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={() => handleViewProfile(tutor.tutor_id)}
                    >
                      View Profile
                    </Button>
                  </Flex>
                </Td>
                <Td >
                <Switch colorScheme='green' size='md' onChange={() => handleSwitchChange(tutor.tutor_id)}
    isChecked={tutor.active} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TutorsList;
