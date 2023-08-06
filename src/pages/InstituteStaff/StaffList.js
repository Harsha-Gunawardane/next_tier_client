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
  Spacer,
  Badge
} from '@chakra-ui/react';
import data from './data/data.json';
import { Link, useNavigate } from 'react-router-dom';


const staffData = data.staffs;

const StaffList = () => {
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
      height: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `;

  // Calculate the counts for each filter option
  const totalCount = staffData.length;
  const maleCount = staffData.filter((staff) => staff.gender.toLowerCase() === 'male').length;
  const femaleCount = staffData.filter((staff) => staff.gender.toLowerCase() === 'female').length;
  const managerCount = staffData.filter((staff) => staff.designation.toLowerCase() === 'manager').length;
  const staffCount = staffData.filter((staff) => staff.designation.toLowerCase() === 'staff').length;


  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('');
  const [filterByGender, setFilterByGender] = useState('');

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


  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterBy === '' || staff.designation.toLowerCase() === filterBy.toLowerCase()) &&
      (filterByGender === '' || staff.gender.toLowerCase() === filterByGender.toLowerCase())
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

  const navigate = useNavigate();

  const handleViewProfile = (staffId) => {
    // history.push(`/staff/profile/${staffId}`);
    // With this:
navigate(`/staff/profile/${staffId}`);
  };

  return (

    <Box backgroundColor="#F9F9F9" width="100%" >
      <Box>
        <Flex align="center" justify="space-between" p={4}>
          <Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">
            Institute Staffs
          </Text>
          <Link to="/staff/add-staff">
          <Button size="sm" mr={4} colorScheme="blue" mt={1}>
            Add new staff
          </Button>
          </Link>
        </Flex>
      </Box>
      <Box>
        <SimpleGrid p="10px" columns={5} spacing={6} minChildWidth={200}>

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
            <Flex paddingLeft={7}>
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
            <Flex paddingLeft={7}>
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
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Filter By role:
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
                  <option value="">All-{totalCount}</option>
                  <option value="Manager">Manager -{managerCount}</option>
                  <option value="Staff">Staff -{staffCount}</option>
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
                  value={filterByGender}
                  onChange={handleFilterByGenderChange}
                  w="max-content"
                  backgroundColor="white"
                >
                  <option value="">All-{totalCount}</option>
                  <option value="Male">Male -{maleCount}</option>
                  <option value="Female">Female - {femaleCount}</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
        
      </Box>
      <Box width="100%" height="72vh" overflowY="scroll" css={scrollbarStyles}>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="6" marginLeft={4} marginRight={4}>
          {sortedStaff.map((staff) => (
            <Box
              key={staff.id}
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
              <Avatar name={staff.name} src={staff.profileImage} mb="2" size="xl" />
              <Text fontWeight="bold" fontSize={13}>
                {staff.name}
              </Text>
              <Text fontSize={13}>{staff.gender}</Text>
              <Text fontSize={13}>{staff.designation}</Text>
              <Text fontSize={13}>Joined Date: {staff.joinedDate}</Text>
              <Flex>
                {/* <Text fontSize={13} >Account status:</Text> */}
                {/* <Badge colorScheme={staff.acc_status === 'Disabled' ? 'red' : 'green'} >
                  {staff.acc_status}
                </Badge> */}
              </Flex>
              {/* <Link to={`/staff/profile/${staff.id}`}><Button size="sm" colorScheme="blue" marginTop={2}>
                View Profile
              </Button></Link> */}
              <Button
              size="sm"
              colorScheme="blue"
              marginTop={2}
              onClick={() => handleViewProfile(staff.id)}
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

export default StaffList;
