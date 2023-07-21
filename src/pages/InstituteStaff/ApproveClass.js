import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Heading, Box, Flex } from '@chakra-ui/react';
import ViewTable from '../../components/instituteStaff/ViewTable';
import data from './data/data';
import AddClass from '../../components/instituteStaff/AddClass';


function ApproveClass() {
  const handleAddClass = (formData) => {
    // Handle the form data submission here
    console.log('Submitted data:', formData);
    
  };
  return (
    <Box width="100%" marginLeft={5}>
      <Flex justify="space-between" align="center" mt="4" mr="80px">
        <Heading as="h1" size="lg" mb="5">Class Approval</Heading>
        <AddClass onAddClass={handleAddClass} />
      </Flex>

      <Tabs position="relative" colorScheme="blue" backgroundColor="#ffffff" marginRight={5} border="0.05px solid #DAE6F0" borderRadius={15}>
        <TabList  gap={10}  marginLeft={5}>
          <Tab>All Requests</Tab>
          <Tab>Approved</Tab>
          <Tab>Pending</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <ViewTable data={data.allRequests} tableType="allRequests" />
          </TabPanel>
          <TabPanel>
            <ViewTable data={data.approved} tableType="approved"  />
          </TabPanel>
          <TabPanel>
            <ViewTable data={data.pending} tableType="pending"/>
          </TabPanel>
          <TabPanel>
            <ViewTable data={data.rejected} tableType="rejected" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ApproveClass;
