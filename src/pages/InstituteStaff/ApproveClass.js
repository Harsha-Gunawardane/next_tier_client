import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Heading, Box, Flex, SimpleGrid } from '@chakra-ui/react';
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

  const scrollbarStyles = `
    ::-webkit-scrollbar {
      width: 4px;
      height:8px;
      border-radius: 10px;
      background-color: #f5f5f5;
      margin-left:2px
    }
  
    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 8px;
      border: 1px solid white
    }
  
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `;
  
  return (
    <Box width="100%" marginLeft={5} marginRight={5}>
      <Flex direction={["column", "column", "row"]}
        justify="space-between"
        align="center"
        mb={2}
        mt={["10px", "20px", "25px"]}
        mr={["0", "0", "60px"]}>
        <Heading marginLeft={13} fontSize={20} color="#242424">
          Class Approval
        </Heading>
        <AddClass onAddClass={handleAddClass} />
      </Flex>

      <SimpleGrid column={1} >
      <Tabs position="relative"  z-index="1" colorScheme="blue" backgroundColor="#ffffff" marginX={5} border="0.05px solid #DAE6F0" borderRadius={15}>
        <TabList gap={15} marginLeft={5}>
          <Tab fontSize={13}>All Requests</Tab>
          <Tab fontSize={13}>Approved</Tab>
          <Tab fontSize={13}>Pending</Tab>
          <Tab fontSize={13}>Rejected</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
            <ViewTable data={data.allRequests} tableType="allRequests" />
          </TabPanel>
          <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
            <ViewTable data={data.approved} />
          </TabPanel>
          <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
            <Status
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              teacher={selectedTeacher}
              actionType={selectedTeacher ? selectedTeacher.actionType : "approve"}
              onApprove={() => {
                setIsOpen(false);
              }}
            />
            <ViewTable data={data.pending} tableType="Pending"  onIconClick={(teacher) => {
      setSelectedTeacher({ ...teacher, actionType: "approve" }); 
      setIsOpen(true);
    }} />
          </TabPanel>
          <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
          <Status
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              teacher={selectedTeacher}
              actionType={selectedTeacher ? selectedTeacher.actionType : "reject"}
              onApprove={() => {
                setIsOpen(false);
              }}
            />
            <ViewTable data={data.rejected} tableType="Rejected" onIconClick={(teacher) => {
      setSelectedTeacher({ ...teacher, actionType: "reject" }); 
      setIsOpen(true);
    }}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </SimpleGrid>
    </Box>
  );
}

export default ApproveClass;
