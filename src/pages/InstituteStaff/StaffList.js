import { useState } from 'react';
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
  Spacer
} from '@chakra-ui/react';
import data from './data/data.json';

const staffData = data.staffs;

const StaffList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('');

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

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterBy === '' || staff.designation.toLowerCase() === filterBy.toLowerCase())
  );

  const sortedStaff = filteredStaff.sort((a, b) => {
    let compareValue = 0;
    if (sortBy === 'name') {
      compareValue = a.name.localeCompare(b.name);
    } else if (sortBy === 'joinedDate') {
      compareValue = new Date(a.joinedDate) - new Date(b.joinedDate);
    }
    return compareValue * (sortOrder === 'asc' ? 1 : -1);
  });

  return (
   
<Box backgroundColor="#F9F9F9" width="100%" >
    <Box>
<Flex align="center" justify="space-between" p={4}>
          <Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">
            Institute Staffs
          </Text>
          <Button size="sm" mr={4} colorScheme="blue" mt={1}>
            Add new staff
          </Button>
        </Flex>
        </Box>
<Box>
        <SimpleGrid p="10px" columns={4} spacing={10} minChildWidth={250}>

        <Box height="40px">
            <Input
              placeholder="Search staff"
              value={searchTerm}
              onChange={handleSearchInputChange}
              mb={['2', '0']}
              fontSize={13}
              backgroundColor="white"
            />
          </Box>

          <Box height="40px">
            <Flex>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort By:
                </Text>
              </Box>
              <Box>
                <Select value={sortBy} onChange={handleSortByChange} fontSize={13} backgroundColor="white">
                  <option value="name">Name</option>
                  <option value="joinedDate">Joined Date</option>
                </Select>
                <Spacer mx="2" />
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort Order:
                </Text>
              </Box>
              <Box>
                <Select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  w="max-content"
                  fontSize={13}
                  backgroundColor="white"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Select>
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Filter By:
                </Text>
              </Box>
              <Box>
                <Select
                  fontSize={13}
                  value={filterBy}
                  onChange={handleFilterByChange}
                  w="max-content"
                  backgroundColor="white"
                >
                  <option value="">All</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                </Select>
              </Box>
            </Flex>
          </Box>

          

 
 
</SimpleGrid>
</Box>
<Box width="100%" height="72vh" overflowY="scroll">
<SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="6" marginLeft={4} marginRight={4}>
            {sortedStaff.map((staff) => (
              <Box
                key={staff.id}
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                shadow="md"
                bg="white"
                mb="4"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Avatar name={staff.name} src={staff.profileImage} mb="2" size="xl" />
                <Text fontWeight="bold" fontSize={13}>
                  {staff.name}
                </Text>
                <Text fontSize={13}>{staff.designation}</Text>
                <Text fontSize={13}>Joined Date: {staff.joinedDate}</Text>
                <Button size="sm" colorScheme="blue" marginTop={2}>
                  View Profile
                </Button>
              </Box>
            ))}
          </SimpleGrid>

</Box>
</Box>

        
   
  );
};

export default StaffList;
