import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Heading, Box, Flex } from '@chakra-ui/react';
import ViewTable from '../../components/Class/ViewTable';
import data from './data/data';
import AddClass from '../../components/Class/AddClass';
import Status from '../../components/Class/Status';

function ApproveClass() {
  const handleAddClass = (formData) => {
    // Handle the form data submission here
    console.log('Submitted data:', formData);
  };

  // State to manage the modal open/close and the selected teacher's data
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Function to handle the click event 
  const handleViewIconClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsOpen(true);
  };

  return (
    <Box width="100%" marginLeft={5}>
      <Flex justify="space-between" align="center" mt="4" mr="80px">
        <Heading marginLeft={13} fontSize={20} color="#242424">
          Class Approval
        </Heading>
        <AddClass onAddClass={handleAddClass} />
      </Flex>

      <Tabs position="relative" colorScheme="blue" backgroundColor="#ffffff" marginRight={5} border="0.05px solid #DAE6F0" borderRadius={15}>
        <TabList gap={15} marginLeft={5}>
          <Tab fontSize={13}>All Requests</Tab>
          <Tab fontSize={13}>Approved</Tab>
          <Tab fontSize={13}>Pending</Tab>
          <Tab fontSize={13}>Rejected</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <ViewTable data={data.allRequests} tableType="allRequests" />
          </TabPanel>
          <TabPanel>
            <ViewTable data={data.approved} />
          </TabPanel>
          <TabPanel>
            <Status
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              teacher={selectedTeacher}
              onApprove={() => {
                setIsOpen(false);
              }}
            />
            <ViewTable data={data.pending} tableType="Pending" onIconClick={handleViewIconClick} />
          </TabPanel>
          <TabPanel>
            <ViewTable data={data.rejected} tableType="Rejected" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ApproveClass;
