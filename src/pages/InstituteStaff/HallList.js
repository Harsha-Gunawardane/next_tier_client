import React, { useState,useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddHall from "../../components/Hall/AddHall";
import EditHall from "../../components/Hall/EditHall";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function HallList() {
  const [searchInput, setSearchInput] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [filteredHalls, setFilteredHalls] = useState([]); 

  const handleAddHall = (formData) => {
    // Handle the form data submission here
    console.log("Submitted data:", formData);
  };
  
  const handleSearch = () => {
    const searchTerm = searchInput.trim().toLowerCase();
    const filteredHallsResult = filteredHalls.filter(
      (hall) =>
        hall.name.toLowerCase().includes(searchTerm) ||
        hall.capacity.toString().includes(searchTerm) ||
        hall.facilities.toLowerCase().includes(searchTerm)
    );
    setFilteredHalls(filteredHallsResult);
  };

  const toast = useToast(); // Initialize useToast

  useEffect(() => {
    // Fetch staff details from the backend API
    const fetchHallDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/hall");
        setFilteredHalls(response.data);
        
       
      } catch (error) {
        console.error("Error fetching hall details:", error);
        // Display error toast
        toast({
          title: "Error",
          description: "Error fetching hall details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchHallDetails();
  }, [toast]);

 

  // State to manage the opening and closing of the edit drawer
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  // Function to handle opening the edit drawer
  const handleEditOpen = (hall) => {
    setSelectedHall(hall);
    setIsEditOpen(true);
  };

  const CardHoverStyles = {
    cursor: "pointer",
    _hover: {
      borderRadius: "5px",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    },
  };

  const ButtonStyles = {
    bg: "#0074D9",
    height: "40px",
    color: "white",
    borderRadius: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    _hover: {
      backgroundColor: "blue.400",
    },
  };

  const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin-left: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
    border: 1px solid white;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

  return (
    <Box width="100%" marginX={5}>
      <Box display="flex" alignItems="center">
        <Link to="/staff/hall">
          <BiArrowBack style={{ marginRight: "20px", cursor: "pointer" }} />
        </Link>
        <Box fontSize="18px" fontWeight="bold" padding="10px 25px 15px 0">
          Hall Details
        </Box>
      </Box>
      <Box border="1px solid" borderColor="gray.100" borderRadius="15px">
        <Flex
          direction={["column", "row"]}
          justify={["flex-start", "space-between"]}
          align={["flex-start", "center"]}
          mt="5"
          ml={["5", "10"]}
          mr={["5", "90px"]}
        >
          {/* Search Bar */}
          <InputGroup width={["100%", "auto"]}>
            {" "}
            <Input
              width={["100%", "300px"]}
              placeholder="Search a Hall"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
          </InputGroup>
          {/* Space */}
          <Box mt={["3", "0"]} />
          {/* Add Hall */}
          <AddHall onAddHall={handleAddHall} />
        </Flex>

        <Box px="4" mt="5">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            height="550px"
            overflowY="scroll"
            css={scrollbarStyles}
          >
            {/* Hall list cards */}
            {filteredHalls.map((hall) => (
              <Box key={hall.id} paddingX="3" paddingY="3">
                <Card
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  borderColor="gray.300"
                  width={{ base: "100%", sm: "230px" }}
                  height="280px"
                  textAlign="center"
                  sx={CardHoverStyles}
                >
                  <CardHeader fontSize="md" fontWeight="bold" p={2}>
                    <img
                      src={hall.hall_profile}
                      alt={`Hall ${hall.name}`}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    Hall {hall.name}
                  </CardHeader>
                  <CardBody p={1}>
                    <p style={{ fontSize: "13px", textAlign: "left" }}>
                      Max Capacity: {hall.capacity} students
                    </p>
                    <p style={{ fontSize: "13px", textAlign: "left" }}>
                      Available Facilities: {hall.facilities}
                    </p>
                  </CardBody>

                  <Button
                    size="md"
                    sx={ButtonStyles}
                    onClick={() => handleEditOpen(hall)}
                  >
                    EDIT
                  </Button>
                </Card>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      {isEditOpen && (
        <EditHall
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          hallData={selectedHall}
          onSave={(editedHall) => {
            console.log("Edited hall data:", editedHall);
            setIsEditOpen(false);
          }}
        />
      )}
    </Box>
  );
}

export default HallList;
