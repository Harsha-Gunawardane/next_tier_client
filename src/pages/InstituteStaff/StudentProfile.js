import { Box, Grid, GridItem, Avatar, Text, Badge, Flex, SimpleGrid, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import data from './data/data.json';


function StuProfile() {
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
    const stuData = data.Students.find((stu) => stu.stu_id.toString() === id);
    console.log('Stu Data:', stuData);


    // Check if the staff data is found
    if (!stuData) {
        return <div>Staff not found</div>;
    }

    return (
        <Box backgroundColor="#F9F9F9" width="100%">
            <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
                {/**Grid Item 1 */}
                <GridItem
                    w="100%"
                    h={{base: '50vh', lg: '50vh' }} 
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
                        <Avatar width={200} height={200} mt={4} src={stuData.profileImage}></Avatar>
                        <Text fontWeight="bold" fontSize={20} mt={3}>
                            {stuData.fName}{stuData.lName}
                        </Text>
                        <Text fontSize={13} mt={1}>{stuData.gender}</Text>
                        <Text fontSize={13} mt={1}>{stuData.stream}</Text>
                        <Text fontSize={13} mt={1}>Joined Date: {stuData.joinedDate}</Text>
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
                            <Tab fontSize={14} fontWeight="bold" _selected={{color:'white',bg:'blue.500'}}>Guardian Information</Tab>
                            <Tab fontSize={14} fontWeight="bold" _selected={{color:'white',bg:'blue.500'}}>Course Details</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={1} minChildWidth={300}>
                                    <Box borderRadius={15} p={5}>
                                        {/* Personal Info */}
                                        {/* <Text fontSize={14} mb={2} fontWeight="bold">Personal Information</Text> */}
                                        <SimpleGrid columns={2} spacingX={4} spacingY={2}>

                                            <FormControl>
                                                <FormLabel fontSize="small">First Name</FormLabel>
                                                <Input value={stuData.fName} bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small">Last Name</FormLabel>
                                                <Input bg="white" value={stuData.lName} fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Date of Birth</FormLabel>
                                                <Input bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>E-mail</FormLabel>
                                                <Input bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Phone Number</FormLabel>
                                                <Input bg="white" value={stuData.phn_num} fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Stream</FormLabel>
                                                <Input bg="white" value={stuData.stream} fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Address</FormLabel>
                                                <Textarea bg="white" fontSize="small" readOnly />
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
                                        <SimpleGrid columns={2} spacingX={4} spacingY={2}>

                                            <FormControl>
                                                <FormLabel fontSize="small">Relationship with the student</FormLabel>
                                                <Input bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small">Full Name</FormLabel>
                                                <Input bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Mobile Number</FormLabel>
                                                <Input bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel fontSize="small" mt={3}>Address</FormLabel>
                                                <Textarea bg="white" fontSize="small" readOnly />
                                            </FormControl>
                                        </SimpleGrid>
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default StuProfile
