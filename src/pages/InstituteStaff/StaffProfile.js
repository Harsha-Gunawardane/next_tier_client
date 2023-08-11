import { useState,useEffect } from 'react';
import { Box, Grid, GridItem, Avatar, Text, Badge, Flex, SimpleGrid, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import profilePic from "../LandingPage/Assets/avtr9.jpg";
// import data from './data/data.json';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link} from "react-router-dom";
function Profile() {
  const axiosPrivate = useAxiosPrivate();
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
  
  const { id } = useParams();
// const staffData = data.staffs.find((staff) => staff.id.toString() === id);
// console.log('Staff Data:', staffData);
const [staffDetails, setStaffDetails] = useState(null);
useEffect(() => {
  const fetchStaffProfile = async () => {
    try {
      const response = await axiosPrivate.get(`/staff/profile/${id}`);
      setStaffDetails(response.data);
    } catch (error) {
      console.error("Error fetching staff profile:", error);
    }
  };

  fetchStaffProfile();
}, [axiosPrivate, id]);

if (!staffDetails) {
  return <div>Loading...</div>;
}

  // // Check if the staff data is found
  // if (!staffData) {
  //   return <div>Staff not found</div>;
  // }

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
        {/**Grid Item 1 */}
        <GridItem
          w="100%"
          h={{ base: '50vh', lg: '50vh' }}
          as="aside"
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          marginLeft={4}
          borderRadius={15}
        >
          <Box height="53vh"
            borderWidth="1px"
            borderRadius={15}
            shadow="md"
            bg="white"
            mb="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={3}>
            <Avatar width={200} height={200} mt={4} src={profilePic} ></Avatar>
            <Text fontWeight="bold" fontSize={20} mt={3}>
            {staffDetails.first_name} {staffDetails.last_name}
            </Text>
            <Text fontSize="small" mt={1}>gender</Text>
            <Text  fontSize="small" mt={1}>Staff</Text>
            <Text  fontSize="small" mt={1}>Joined Date:  {new Date(staffDetails.join_date).toLocaleDateString()} </Text>
            {/* <Flex mt={3} >
              <Text fontSize={13} >Account status:</Text>
              <Badge colorScheme="green" fontSize={15}>
                Enabled
              </Badge>
            </Flex> */}
          </Box>


        </GridItem>

        {/**Grid Item 2 */}
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: '88.3vh', lg: '88.3vh' }}
          marginRight={4}
          marginLeft={3}
        >
          <Tabs height="88.3vh" mt={3} borderRadius={0} overflowY='scroll' css={scrollbarStyles} variant="enclosed">
            <TabList>
              <Tab fontSize={14} fontWeight="bold" _selected={{color:'white',bg:'blue.500'}}>Personal Information</Tab>
              <Tab fontSize={14} fontWeight="bold" _selected={{color:'white',bg:'blue.500'}}>More Information</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={1} minChildWidth={300}>
                  <Box  borderRadius={15} p={5}>
                    {/* Personal Info */}
                    {/* <Text fontSize={14} mb={2} fontWeight="bold">Personal Information</Text> */}
                    <SimpleGrid columns={2} spacingX={4} spacingY={2}>

                      <FormControl>
                        <FormLabel fontSize={12}>First Name</FormLabel>
                        <Input  value={staffDetails.first_name}  bg="white"  fontSize="small" readOnly/>
                      </FormControl>
                      <FormControl>
                        <FormLabel  fontSize="small">Last Name</FormLabel>
                        <Input  bg="white" readOnly value={staffDetails.last_name}/>
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>Date of Birth</FormLabel>
                        <Input  value={new Date(staffDetails.DOB).toLocaleDateString()} fontSize="small" bg="white"/>
                      </FormControl>
                      <FormControl>
                        <FormLabel  fontSize="small"  mt={3}>E-mail</FormLabel>
                        <Input  bg="white" fontSize="small"/>
                      </FormControl>
                      <FormControl>
                        <FormLabel  fontSize="small" mt={3}>Phone Number</FormLabel>
                        <Input  value={staffDetails.phone_number} bg="white" fontSize="small" />
                      </FormControl>
                      <FormControl>
                        <FormLabel  fontSize="small" mt={3}>Role</FormLabel>
                        <Input  bg="white" value="Staff" fontSize="small"/>
                      </FormControl>
                      <FormControl>
                        <FormLabel  fontSize="small" mt={3}>Address</FormLabel>
                        <Textarea value={staffDetails.address} bg="white" fontSize="small"/>
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                </SimpleGrid>
              </TabPanel>
              <TabPanel>

                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                <SimpleGrid columns={1} spacingX={4} spacingY={2}>
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="small">Qualification</FormLabel>
                      <Textarea  bg="white" />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="small"  mt={3}>Previous Job Description</FormLabel>
                      <Textarea  bg="white"/>
                    </FormControl>
                  </Box>
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Box>
                <Link to="/staff/staff-list">
            <Button colorScheme='blue' mr={10} p={3}>Back</Button>
            </Link>
            </Box>
          </Box>
          </Tabs>
        
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Profile
