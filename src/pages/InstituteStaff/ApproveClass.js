import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Heading,
  Box,
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import ViewTable from "../../components/Class/ViewTable";
import AddClass from "../../components/Class/AddClass";
import Status from "../../components/Class/Status";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ApproveClass() {
  const axiosPrivate = useAxiosPrivate();
  const [classData, setClassData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchClassRequests = async () => {
      try {
        const response = await axiosPrivate.get("/staff/class", {});

        setClassData(response.data);
      } catch (error) {
        console.error("Error fetching class details:", error);
        toast({
          title: "Error",
          description: "Error fetching class details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchClassRequests();
  }, [toast, axiosPrivate]);

  const handleApprove = async (requestId) => {
    try {
      const response = await axiosPrivate.put(
        `/staff/class/approve/${requestId}`,
        {}
      );

      // Update classData state after status change
      setClassData((prevClassData) => {
        return prevClassData.map((request) =>
          request.id === requestId
            ? { ...request, status: "APPROVED" }
            : request
        );
      });
      console.log("Course request approved:", response.data);
    } catch (error) {
      console.error("Error approving course request:", error);
      toast({
        title: "Error",
        description: "Error approving course request. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axiosPrivate.put(
        `/staff/class/reject/${requestId}`,
        {}
      );

      // Update classData state after status change
      setClassData((prevClassData) => {
        return prevClassData.map((request) =>
          request.id === requestId
            ? { ...request, status: "REJECTED" }
            : request
        );
      });
      console.log("Course request rejected:", response.data);
    } catch (error) {
      console.error("Error rejectinging course request:", error);
      toast({
        title: "Error",
        description: "Error rejectinging course request. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleAddClass = (formData) => {
    // Handle the form data submission here
    console.log("Submitted data:", formData);
  };

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
    <Box width="100%"  >
      <Flex
        direction={["column", "column", "row"]}
        justify="space-between"
        align="center"
        mb={2}
        mt={["10px", "20px", "25px"]}
        mr={["0", "0", "60px"]}
      >
        <Heading marginLeft={13} fontSize={20} color="#242424">
          Class Approval
        </Heading>
        <AddClass onAddClass={handleAddClass} />
      </Flex>

      <SimpleGrid column={1}>
        <Tabs
          position="relative"
          zIndex="1"
          colorScheme="blue"
          backgroundColor="#ffffff"
          marginX={5}
          border="0.05px solid #DAE6F0"
          borderRadius={15}
          mr={10}
        >
          <TabList gap={15} marginLeft={5}>
            <Tab fontSize={13}>All Requests</Tab>
            <Tab fontSize={13}>Approved</Tab>
            <Tab fontSize={13}>Pending</Tab>
            <Tab fontSize={13}>Rejected</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
              <ViewTable data={classData} tableType="allRequests" />
            </TabPanel>
            <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
              <ViewTable
                tableType="Approved"
                data={classData.filter(
                  (request) => request.status === "APPROVED"
                )}
              />
            </TabPanel>
            <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
              <Status
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                teacher={selectedTeacher}
                onApprove={() => {
                  handleApprove(selectedTeacher.id);
                  setIsOpen(false);
                }}
                onReject={() => {
                  handleReject(selectedTeacher.id);
                  setIsOpen(false);
                }}
              />
              <ViewTable
                tableType="Pending"
                data={classData.filter(
                  (request) => request.status === "PENDING"
                )}
                onIconClick={(teacher) => {
                  setSelectedTeacher({ ...teacher, actionType: "approve" });
                  setIsOpen(true);
                }}
              />
            </TabPanel>
            <TabPanel height="550px" overflowY="scroll" css={scrollbarStyles}>
              <ViewTable
                tableType="Rejected"
                data={classData.filter(
                  (request) => request.status === "REJECTED"
                )}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </SimpleGrid>
    </Box>
  );
}

export default ApproveClass;
