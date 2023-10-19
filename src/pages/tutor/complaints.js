import {
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Textarea,
  CardHeader,
  Flex,
  Box,
  Text,
  Link,
  Image,
  Input,
  TabList,
  Tab,
  Tabs,
  Icon,
  TabPanel,
  TabPanels,
  Button,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import data from "../data/data.json";
import { SearchIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import allComplaints from "../../assests/images/AllComplaints.png";
import pending from "../../assests/images/pendingcomplaints.png";
// import resolved from "./assests/images/completedComplaints.png";
// import ignored from "./assests/images/removedcomplaints.png";

function ComplaintsListView() {
  // const complaints = data.complaints;
  // const complaintstable = data.complaintstable;
  const toast = useToast();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ action: "" });
  const [complaints, setComplaints] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  //complaints count
  const [complaintCounts, setComplaintCounts] = useState({
    ignoredCount: 0,
    pendingCount: 0,
    resolvedCount: 0,
  });


  useEffect(() => {
    // Fetch complaints from the backend API
    axiosPrivate
      .get("/tutor/complaints")
      .then((response) => {
        const allComplaints = response.data;

        // Filter complaints based on search query
        const filtered = allComplaints.filter(
          (complaint) =>
            complaint.user.first_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            complaint.user.last_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        // Update filtered complaints
        setFilteredComplaints(filtered);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    // Fetch complaints from the backend API
    axiosPrivate
      .get("/tutor/complaints")
      .then((response) => {
        const allComplaints = response.data;

        const ignoredCount = allComplaints.filter(
          (complaint) => complaint.status === "IGNORED"
        ).length;
        const pendingCount = allComplaints.filter(
          (complaint) => complaint.status === "PENDING"
        ).length;
        const resolvedCount = allComplaints.filter(
          (complaint) => complaint.status === "RESOLVED"
        ).length;

        setComplaintCounts({
          ignoredCount,
          pendingCount,
          resolvedCount,
        });
        console.log(complaintCounts.ignoredCount);

        setComplaints(allComplaints);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleOpenModal = (complaintrow) => {
    setSelectedComplaint(complaintrow);
    setFormData({ action: complaintrow.action || "" });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, action: e.target.value });
  };

  const handleEditSubmit = () => {

    if (!formData.action) {
      toast({
        title: "Action is required",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return; // Stop the function if action is empty
    }

    const updatedComplaint = {
      ...selectedComplaint,
      action: formData.action,
      status: "RESOLVED",
    };
    // Make API call to update complaint
    axiosPrivate
      .put(`/tutor/complaints/edit/${selectedComplaint.id}`, {
        action: formData.action,
      })
      .then((response) => {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === updatedComplaint.id ? updatedComplaint : complaint
          )
        );
        handleCloseModal();
        toast({
          title: "Complaint updated successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "An error occured",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleIgnoreSubmit = () => {

    if (formData.action) {
      toast({
        title: "Action should be empty",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return; // Stop the function if action is not empty
    }

    const updatedComplaint = { ...selectedComplaint, status: "IGNORED" };
    // Make API call to ignore complaint
    axiosPrivate
      .put(`/tutor/complaints/ignore/${selectedComplaint.id}`)
      .then((response) => {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === updatedComplaint.id ? updatedComplaint : complaint
          )
        );
        handleCloseModal();
        toast({
          title: "Complaint Ignored successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "An error occured",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const [
    selectedComplaintForViewResolved,
    setSelectedComplaintForViewResolved,
  ] = useState(null);
  const [isViewModalOpenResolved, setIsViewModalOpenResolved] = useState(false);

  const handleOpenViewModalResolved = (complaintrow) => {
    setSelectedComplaintForViewResolved(complaintrow);
    setIsViewModalOpenResolved(true);
  };

  const handleCloseViewModalResolved = () => {
    setSelectedComplaintForViewResolved(null);
    setIsViewModalOpenResolved(false);
  };
  //Ignored
  const [selectedComplaintForViewIgnored, setSelectedComplaintForViewIgnored] =
    useState(null);
  const [isViewModalOpenIgnored, setIsViewModalOpenIgnored] = useState(false);

  const handleOpenViewModalIgnored = (complaintrow) => {
    setSelectedComplaintForViewIgnored(complaintrow);
    setIsViewModalOpenIgnored(true);
  };

  const handleCloseViewModalIgnored = () => {
    setSelectedComplaintForViewIgnored(null);
    setIsViewModalOpenIgnored(false);
  };

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
    <div style={{ backgroundColor: "#F9F9F9", width: "100%" }}>
      <Heading marginLeft={13} fontSize={20} marginTop={6} mb='10px' color="#242424">
        Complaints
      </Heading>

    

      <SimpleGrid
        p="10px"
        spacing={20}
        minChildWidth="120px"
        ml={13}
        mr={13}
      >
        <Box height="92px" shadow="base" bg="white" borderRadius={15}>
          <Box>
            <Text fontSize="16px" fontWeight="bold" pl={4} pt={2}>
              All Complaints
            </Text>
          </Box>
          <Box>
            <Flex justify="space-around">
              <Box pt={3}>
                <Text fontSize="22px"> {complaints.length}</Text>
              </Box>
              <Box>
                {/* <Image
                  src={allComplaints}
                  width="40px"
                  height="40px"
                  mt={1}
                ></Image> */}
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box height="92px" shadow="base" bg="white" borderRadius={15}>
          <Box>
            <Text fontSize="16px" fontWeight="bold" pl={4} pt={2}>
              Resolved Complaints
            </Text>
          </Box>
          <Box>
            <Flex justify="space-around">
              <Box pt={3}>
                <Text fontSize="22px">{complaintCounts.resolvedCount}</Text>
              </Box>
              <Box>
                {/* <Image src={resolved} width="40px" height="40px" mt={1}></Image> */}
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box height="92px" shadow="base" bg="white" borderRadius={15}>
          <Box>
            <Text fontSize="16px" fontWeight="bold" pl={4} pt={2}>
              Pending Complaints
            </Text>
          </Box>
          <Box>
            <Flex justify="space-around">
              <Box pt={3}>
                <Text fontSize="22px"> {complaintCounts.pendingCount}</Text>
              </Box>
              <Box>
                {/* <Image src={pending} width="40px" height="40px" mt={1}></Image> */}
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box height="92px" shadow="base" bg="white" borderRadius={15}>
          <Box>
            <Text fontSize="16px" fontWeight="bold" pl={4} pt={2}>
              Ignored Complaints
            </Text>
          </Box>
          <Box>
            <Flex justify="space-around">
              <Box pt={3}>
                <Text fontSize="22px">{complaintCounts.ignoredCount}</Text>
              </Box>
              <Box>
                {/* <Image src={ignored} width="40px" height="40px" mt={1}></Image> */}
              </Box>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>

      <SimpleGrid column={1}>
        <Box marginLeft={13} marginTop={13}>
          <Input
            width={300}
            placeholder="Search for users"
            backgroundColor="#ffffff"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box marginTop={13} marginLeft={13}>
          <Tabs
            colorScheme="blue"
            backgroundColor="#ffffff"
            marginRight={5}
            border="0.05px solid #DAE6F0"
            borderRadius={15}
          >
            <TabList gap={10} marginLeft={5}>
              <Tab fontSize={13} fontWeight="medium">
                All
              </Tab>
              <Tab fontSize={13} fontWeight="medium">
                Resolved
              </Tab>
              <Tab fontSize={13} fontWeight="medium">
                Pending
              </Tab>
              <Tab fontSize={13} fontWeight="medium">
                Removed
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box height="380px" overflowY="scroll" css={scrollbarStyles}>
                  <TableContainer>
                    <Table variant="simple">
                      <TableCaption>All complaints</TableCaption>
                      <Thead>
                        <Tr fontSize={13}>
                          <Th>Date</Th>
                          <Th>Profile</Th>
                          <Th>Status</Th>

                          {/* <Th >Action</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredComplaints
                          .sort(
                            (a, b) =>
                              new Date(b.posted_at) - new Date(a.posted_at)
                          ) // Sort in descending order
                          .map((complaintrow) => (
                            <Tr key={complaintrow.id}>
                              <Td fontSize={13}>
                                {new Date(
                                  complaintrow.posted_at
                                ).toLocaleDateString()}
                              </Td>
                              <Td>
                                <Flex gap={4}>
                                  <Avatar
                                    src={complaintrow.user.profile_picture}
                                  />
                                  <Text fontSize={13} marginTop={4}>
                                    {complaintrow.user.first_name}{" "}
                                    {complaintrow.user.last_name}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td paddingLeft={-14}>
                                <Text
                                  textAlign="center"
                                  width="120px"
                                  fontSize={13}
                                  color="white"
                                  borderRadius={15}
                                  px={2}
                                  py={1}
                                  bg={
                                    complaintrow.status === "PENDING"
                                      ? "red.500"
                                      : complaintrow.status === "RESOLVED"
                                      ? "green.500"
                                      : "gray.500"
                                  }
                                >
                                  {complaintrow.status}
                                </Text>
                              </Td>
                              {/* <Td><Icon as={EditIcon} /></Td> */}
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>

              <TabPanel>
                <Box height="380px" overflowY="scroll" css={scrollbarStyles}>
                  <TableContainer>
                    <Table variant="simple">
                      <TableCaption>Resolved complaints</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Date</Th>
                          <Th>Profile</Th>
                          <Th>Type</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredComplaints
                          .filter(
                            (complaintrow) => complaintrow.status === "RESOLVED"
                          )
                          .sort(
                            (a, b) =>
                              new Date(b.posted_at) - new Date(a.posted_at)
                          ) // Sort in descending order
                          .map((complaintrow) => (
                            <Tr key={complaintrow.id}>
                              <Td fontSize={13}>
                                {new Date(
                                  complaintrow.posted_at
                                ).toLocaleDateString()}
                              </Td>
                              <Td>
                                <Flex gap={4}>
                                  <Avatar
                                    src={complaintrow.user.profile_picture}
                                  />
                                  <Text fontSize={13} marginTop={4}>
                                    {complaintrow.user.first_name}{" "}
                                    {complaintrow.user.last_name}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Text fontSize={13}>{complaintrow.type}</Text>
                              </Td>
                              <Td paddingLeft={10}>
                                <Icon
                                  as={ViewIcon}
                                  onClick={() =>
                                    handleOpenViewModalResolved(complaintrow)
                                  }
                                />
                              </Td>
                              <Modal
                                blockScrollOnMount={false}
                                isOpen={isViewModalOpenResolved}
                                onClose={handleCloseViewModalResolved}
                              >
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>View Complaint</ModalHeader>
                                  <ModalCloseButton />
                                  <ModalBody>
                                    <FormControl>
                                      <FormLabel>Name</FormLabel>
                                      <Input
                                        value={`${selectedComplaintForViewResolved?.user.first_name} ${selectedComplaintForViewResolved?.user.last_name}`}
                                        isReadOnly
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Date</FormLabel>
                                      <Input
    value={
      selectedComplaintForViewResolved?.posted_at
        ? new Date(selectedComplaintForViewResolved.posted_at).toLocaleDateString()
        : ''
    }
    isReadOnly
  />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Description</FormLabel>
                                      <Textarea
                                        value={
                                          selectedComplaintForViewResolved?.message
                                        }
                                        height={40}
                                        isReadOnly
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Action taken</FormLabel>
                                      <Textarea
                                        value={
                                          selectedComplaintForViewResolved?.action
                                        }
                                        height={40}
                                        isReadOnly
                                      />
                                    </FormControl>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      variant="ghost"
                                      onClick={handleCloseViewModalResolved}
                                    >
                                      Close
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>

              <TabPanel>
                <Box height="380px" overflowY="scroll" css={scrollbarStyles}>
                  <TableContainer>
                    <Table variant="simple">
                      <TableCaption>Pending complaints</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Date</Th>
                          <Th>Profile</Th>
                          <Th>Type</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredComplaints
                          .filter(
                            (complaintrow) => complaintrow.status === "PENDING"
                          )
                          .sort(
                            (a, b) =>
                              new Date(b.posted_at) - new Date(a.posted_at)
                          ) // Sort in descending order
                          .map((complaintrow) => (
                            <Tr key={complaintrow.id}>
                              <Td fontSize={13}>
                                {new Date(
                                  complaintrow.posted_at
                                ).toLocaleDateString()}
                              </Td>
                              <Td>
                                <Flex gap={4}>
                                  <Avatar
                                    src={complaintrow.user.profile_picture}
                                  />
                                  <Text fontSize={13} marginTop={4}>
                                    {complaintrow.user.first_name}{" "}
                                    {complaintrow.user.last_name}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                <Text fontSize={13}>{complaintrow.type}</Text>
                              </Td>
                              <Td paddingLeft={10}>
                                {/* <Link to={`/staff/complaints/editComplaint/${complaintrow.id}`}> */}
                                <Icon
                                  as={EditIcon}
                                  onClick={() => handleOpenModal(complaintrow)}
                                />

                                {/* </Link> */}
                              </Td>
                              <Modal
                                blockScrollOnMount={false}
                                isOpen={isOpen}
                                onClose={handleCloseModal}
                              >
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>Edit Complaint</ModalHeader>
                                  <ModalCloseButton />
                                  <ModalBody>
                                    <FormControl>
                                      <FormLabel>Name</FormLabel>
                                      <Input
                                        value={`${selectedComplaint?.user.first_name} ${selectedComplaint?.user.last_name}`}
                                        isReadOnly
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Date</FormLabel>
                                      {/* <Input
                                        value={
                                          selectedComplaint?.posted_at
                                        }
                                        isReadOnly
                                      /> */}
                                        <FormLabel>Date</FormLabel>
                                      <Input
    value={
      selectedComplaint?.posted_at
        ? new Date(selectedComplaint.posted_at).toLocaleDateString()
        : ''
    }
    isReadOnly
  />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Description</FormLabel>
                                      <Textarea
                                        value={selectedComplaint?.message}
                                        
                                        isReadOnly
                                      />
                                    </FormControl>
                                    {/* <FormControl>
                                      <FormLabel>ID</FormLabel>
                                      <Textarea
                                        value={selectedComplaint?.id}
                                        height={40}
                                        isReadOnly
                                      />
                                    </FormControl> */}
                                    <FormControl mt={4}>
                                      <FormLabel>Action</FormLabel>
                                      <Textarea
                                        name="action"
                                        value={formData.action}
                                        onChange={handleChange}
                                      />
                                    </FormControl>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      colorScheme="blue"
                                      mr={3}
                                      onClick={handleEditSubmit}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      colorScheme="blue"
                                      onClick={handleIgnoreSubmit}
                                      mr={3}
                                    >
                                      Ignore
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      onClick={handleCloseModal}
                                    >
                                      Close
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>

              <TabPanel>
                <Box height="380px" overflowY="scroll" css={scrollbarStyles}>
                  <TableContainer>
                    <Table variant="simple">
                      <TableCaption>Removed Complaints</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Date</Th>
                          <Th>Profile</Th>
                          <Th>Type</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredComplaints
                          .filter(
                            (complaintrow) => complaintrow.status === "IGNORED"
                          )
                          .sort(
                            (a, b) =>
                              new Date(b.posted_at) - new Date(a.posted_at)
                          ) // Sort in descending order
                          .map((complaintrow) => (
                            <Tr key={complaintrow.id}>
                              <Td fontSize={13}>
                                {new Date(
                                  complaintrow.posted_at
                                ).toLocaleDateString()}
                              </Td>
                              <Td>
                                <Flex gap={4}>
                                  <Avatar
                                    src={complaintrow.user.profile_picture}
                                  />
                                  <Text fontSize={13} marginTop={4}>
                                    {complaintrow.user.first_name}{" "}
                                    {complaintrow.user.last_name}
                                  </Text>
                                </Flex>
                              </Td>
                              <Td>
                                {/* <Text
                                    textAlign='center'
                                    width='120px'
                                    fontSize={13}
                                    color="white"
                                    borderRadius={15}
                                    px={2}
                                    py={1}
                                    bg="gray.500"
                                  >
                                    {complaintrow.status}
                                  </Text> */}
                                <Text fontSize={13}>{complaintrow.type}</Text>
                              </Td>
                              <Td paddingLeft={10}>
                                <Icon
                                  as={ViewIcon}
                                  onClick={() =>
                                    handleOpenViewModalIgnored(complaintrow)
                                  }
                                />
                              </Td>
                              <Modal
                                blockScrollOnMount={false}
                                isOpen={isViewModalOpenIgnored}
                                onClose={handleCloseViewModalIgnored}
                              >
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>View Complaint</ModalHeader>
                                  <ModalCloseButton />
                                  <ModalBody>
                                    <FormControl>
                                      <FormLabel>Name</FormLabel>
                                      <Input
                                        value={`${selectedComplaintForViewIgnored?.user.first_name} ${selectedComplaintForViewIgnored?.user.last_name}`}
                                        isReadOnly
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Date</FormLabel>
                                      {/* <Input
                                        value={
                                          selectedComplaintForViewIgnored?.posted_at
                                        }
                                        isReadOnly
                                      /> */}
                                        <FormLabel>Date</FormLabel>
                                      <Input
    value={
      selectedComplaintForViewIgnored?.posted_at
        ? new Date(selectedComplaintForViewIgnored.posted_at).toLocaleDateString()
        : ''
    }
    isReadOnly
  />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>Description</FormLabel>
                                      <Textarea
                                        value={
                                          selectedComplaintForViewIgnored?.message
                                        }
                                        height={40}
                                        isReadOnly
                                      />
                                    </FormControl>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      variant="ghost"
                                      onClick={handleCloseViewModalIgnored}
                                    >
                                      Close
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default ComplaintsListView;