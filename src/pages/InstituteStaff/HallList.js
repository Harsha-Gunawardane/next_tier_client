import React, { useState } from 'react';
import { SimpleGrid, Box, Flex, Card, CardHeader, CardBody, Input, InputLeftElement, InputGroup, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AddHall from '../../components/instituteStaff/AddHall';
import EditHall from '../../components/instituteStaff/EditHall';
import data from './data/data';

function HallList() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredHalls, setFilteredHalls] = useState(data.halls);

  const handleAddHall = (formData) => {
    // Handle the form data submission here
    console.log('Submitted data:', formData);
  };

  const halls = data.halls;

  const handleSearch = () => {
    const searchTerm = searchInput.trim().toLowerCase();
    const filteredHalls = halls.filter(
      (hall) =>
        hall.hallNo.toLowerCase().includes(searchTerm) ||
        hall.capacity.toString().includes(searchTerm) ||
        hall.facilities.toLowerCase().includes(searchTerm)
    );
    setFilteredHalls(filteredHalls);
  };

   // State to manage the opening and closing of the edit drawer
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [selectedHall, setSelectedHall] = useState(null);
 
   // Function to handle opening the edit drawer
   const handleEditOpen = (hall) => {
     setSelectedHall(hall);
     setIsEditOpen(true);
   };

  const CardHoverStyles = {
    cursor: 'pointer',
    _hover: {
      borderRadius: '5px',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    },
  };

  const ButtonStyles = {
    bg: 'blue.600',
    height: '40px',
    color: 'white',
    borderRadius: '2',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    _hover: {
      backgroundColor: 'blue.400',
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
        <Box fontSize="18px" fontWeight="bold" padding="10px 25px 15px 0">
          Hall Details
        </Box>
      <Box border="1px solid" borderColor="gray.100" borderRadius="15px">
        
        {/* Flex container for Search Bar and Add Hall button */}
      <Flex justify="space-between" align="center" mt="5" ml="10" mr="90px">
          {/* Search Bar */}
          <InputGroup>
            <Input
              width="300px"
              placeholder="Search a Hall"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
          </InputGroup>
          {/* Add Hall */}
          <AddHall onAddHall={handleAddHall} />
        </Flex>

        <Box px="4" mt="5">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} height="550px" overflowY="scroll" css={scrollbarStyles}>
            {/* Hall list cards */}
            {filteredHalls.map((hall, index) => (
              <Box key={index} paddingX="3" paddingY="3">
                <Card borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor="gray.300" width="230px" height="280px" textAlign="center"  sx={CardHoverStyles}>
                  
                  <CardHeader fontSize="md" fontWeight="bold" p={2}>
                    <img src={hall.hallImage} alt={`Hall ${hall.hallNo}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                    Hall {hall.hallNo}
                  </CardHeader>
                  <CardBody p={1}>
                    <p style={{ fontSize: '13px', textAlign: 'left' }}>Max Capacity: {hall.capacity} students</p>
                    <p style={{ fontSize: '13px', textAlign: 'left' }}>Available Facilities: {hall.facilities}</p>
                  </CardBody>

                  <Button size="md" sx={ButtonStyles} onClick={() => handleEditOpen(hall)}>EDIT</Button>
                  
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
            console.log('Edited hall data:', editedHall);
            setIsEditOpen(false);
          }}
        />
      )}
    </Box>
  );
}

export default HallList;
