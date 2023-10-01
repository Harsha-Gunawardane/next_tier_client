import React from 'react';
import { useState, useEffect } from "react";
import CourseCardComponent from "../../components/Card/CourseCardComponent";
import { Box, Heading, SimpleGrid, Grid, GridItem, Text, Flex, Avatar, Button, Stack, Badge } from '@chakra-ui/react';
import profileImage from './avtr3.jpg';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import data from "./data/data.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";



function StuPayment() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  // const onOpen = () => setIsOpen(true);
  // const onClose = () => setIsOpen(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedExtendPaymentId, setSelectedExtendPaymentId] = useState(null);

  // State and functions for the first tab
  const [isOpenFirstTab, setIsOpenFirstTab] = useState(false);
  const onOpenFirstTab = () => setIsOpenFirstTab(true);
  const onCloseFirstTab = () => setIsOpenFirstTab(false);

  // State and functions for the second tab
  const [isOpenSecondTab, setIsOpenSecondTab] = useState(false);
  const onOpenSecondTab = () => setIsOpenSecondTab(true);
  const onCloseSecondTab = () => setIsOpenSecondTab(false);

  const [searchTerm, setSearchTerm] = useState("");
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
  const { username } = useParams();

  const [studentDetails, setStudentDetails] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/stu-payment/${username}`);
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [axiosPrivate, username]);

  if (!studentDetails) {
    return <div>Loading...</div>;
  }
  const handleViewProfile = (stuId) => {
    navigate(`/staff/stu-profile/${stuId}`);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
//view payment history
  const  handleViewPaymentHistory = (studentId) => {
    navigate(`/staff/payment-history/${studentId}`);
  };

  //update payment
  const handlePaymentUpdate = async () => {
    if (!selectedPaymentId) {
      console.log("selectedPaymentId is not set");
      return;
    }
  
    try {
      // Make an API call to the backend to update the payment
      const response = await axiosPrivate.put(`/staff/update-payment/${selectedPaymentId}`);
      
      // Handle the response here, you can perform further actions if needed
      console.log("Payment updated successfully:", response.data);
      navigate(`/staff/physical-payment-receipt/${selectedPaymentId}`);
      // Close the modal
      onCloseFirstTab();
    } catch (error) {
      console.error("Error updating payment:", error);
      // Handle error or display an error message to the user
    }
  };
  
  //
 //extend payment
 const handlePaymentExtend = async () => {
  if (!selectedExtendPaymentId) {
    console.log("selectedPaymentId is not set");
    return;
  }

  try {
    // Make an API call to the backend to update the payment
    const response = await axiosPrivate.put(`/staff/extend-payment/${selectedExtendPaymentId}`);
    
    // Handle the response here, you can perform further actions if needed
    console.log("Payment updated successfully:", response.data);
    navigate(`/staff/physical-payment-receipt/${selectedExtendPaymentId}`);
    // Close the modal
    onCloseSecondTab();
  } catch (error) {
    console.error("Error updating payment:", error);
    // Handle error or display an error message to the user
  }
};

  return (
    <div style={{ 'backgroundColor': '#F9F9F9', 'width': '100%' }}>
      <Flex align="center" justify="space-between" p={4}>
        <Heading fontSize={20} color="#242424" mb={4}>
          Student Class Payment
        </Heading>
       <Button size="sm" mr={4} mt={4} colorScheme='blue'
        onClick={() => handleViewPaymentHistory(studentDetails.id)}>
          View Payment History
        </Button> 
      </Flex>

      <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
        {/** Left Panel */}
        <GridItem
          w="100%"
          h={{ base: '78vh', lg: '78vh' }}
          as="aside"
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          marginLeft={4}
          borderRadius={15}
        >
          <Flex justify="space-between" border="0.05px solid #DAE6F0" bg="#ffffff" borderRadius={15} height={200}>
            <Box>
              <Avatar width={120} height={120} marginLeft={5} marginTop={5} src={studentDetails.profile_picture}></Avatar>
              <Button marginLeft={8} marginTop={2} size="sm"
                onClick={() =>
                  handleViewProfile(studentDetails.id)
                } >
                View Profile
              </Button>
            </Box>
            <Box marginRight={6} marginTop={5} width={180}>
              <Box>
                <Text fontSize={13} fontWeight="bold">
                  Full Name
                </Text>
                <Text fontSize={13}>{studentDetails.first_name} {studentDetails.last_name}</Text>
              </Box>
              {studentDetails.students.map((student) => (
      <div key={student.student_id}>
        <Box marginTop={1.5}>
          <Text fontSize={13} fontWeight="bold">
            Batch
          </Text>
          <Text fontSize={13}>{student.grade}</Text>
        </Box>
        <Box marginTop={1.5}>
          <Text fontSize={13} fontWeight="bold">
            Stream
          </Text>
          <Text fontSize={13}>{student.stream}</Text>
        </Box>
      </div>
    ))}
    </Box>
          </Flex>
          <Box width="100%" borderRadius={15} minHeight={{ lg: '28vh' }} mt={5} >
            <Box backgroundColor='##F9F9F9'>
              <Text fontSize={13} fontWeight="bold" marginTop={1.5} marginLeft={3}>
                Recent payments
              </Text>
            </Box>
            <Tabs colorScheme="blue" backgroundColor="#ffffff" border="0.05px solid #DAE6F0" borderRadius={15} height='48vh' overflowY='scroll' css={scrollbarStyles}>
              <TabList gap={10} marginLeft={5}>
                <Tab fontSize={13} fontWeight='medium'>Physical</Tab>
                <Tab fontSize={13} fontWeight='medium'>Online</Tab>
              </TabList>
              <TabPanels>
              <TabPanel>
  {studentDetails.student_purchase_studypack
    .filter((payment) => payment.type === "PHYSICAL" && payment.status === "PAID" && (payment.payment_for === "PURCHASE" ||payment.payment_for === "EXTEND" ))
    .map((payment) => (
      <Box
        key={payment.id}
        width="95%"
        borderRadius={5}
        minHeight="12vh"
        marginTop={2}
        border="0.05px solid #DAE6F0"
        bg="green.100"
        marginLeft={3}
      >
        <Flex>
          <Box width={1} height="15vh" bg="green" marginTop={1} marginLeft={1} borderRadius={10}></Box>
          <Box>
            <Box marginLeft={2} paddingTop={1.5}>
              <Text fontSize={15} fontWeight="bold" marginBottom={1.5}>
                {payment.pack.title} {/* Display the title of the study pack */}
              </Text>
            </Box>
            <Box marginLeft={2} marginTop={1}>
              <Text fontSize={10}>Study Pack Title: {payment.pack.title}</Text> {/* Display the title of the study pack */}
            </Box>
            <Box marginLeft={2} marginTop={1}>
              <Text fontSize={10}>
                Paid amount: {payment.ammount} {/* Display the amount value */}
              </Text>
            </Box>
            <Box marginLeft={2} marginTop={1} marginBottom={1}>
              <Text fontSize={10}>
                Tutor: {payment.pack.tutor.user.first_name} {payment.pack.tutor.user.last_name} {/* Display the tutor's first_name and last_name */}
              </Text>
            </Box>
          </Box>
          <Box paddingLeft={6} paddingTop={10} paddingRight={1}>
          <Badge variant='solid' colorScheme='green'>{
                        payment.purchased_at
                          ? new Date(payment.purchased_at).toLocaleDateString()
                          : ""
                      }</Badge>
          </Box>
        </Flex>
      </Box>
    ))}
</TabPanel>
               
                <TabPanel>
  {studentDetails.student_purchase_studypack
   .filter((payment) => payment.type === "ONLINE" && payment.status === "PAID" && (payment.payment_for === "PURCHASE" ||payment.payment_for === "EXTEND" ))
    .map((payment) => (
      <Box
        key={payment.id}
        width="95%"
        borderRadius={5}
        minHeight="12vh"
        marginTop={2}
        border="0.05px solid #DAE6F0"
        bg="blue.100"
        marginLeft={3}
      >
        <Flex>
          <Box width={1} height="15vh" bg="blue" marginTop={1} marginLeft={1} borderRadius={10}></Box>
          <Box>
            <Box marginLeft={2} paddingTop={1.5}>
              <Text fontSize={15} fontWeight="bold" marginBottom={1.5}>
                {payment.pack.title} {/* Display the title of the study pack */}
              </Text>
            </Box>
            <Box marginLeft={2} marginTop={1}>
              <Text fontSize={10}>Study Pack Title: {payment.pack.title}</Text> {/* Display the title of the study pack */}
            </Box>
            <Box marginLeft={2} marginTop={1}>
              <Text fontSize={10}>
                Paid amount: {payment.ammount} {/* Display the amount value */}
              </Text>
            </Box>
            <Box marginLeft={2} marginTop={1} marginBottom={1}>
              <Text fontSize={10}>
                Tutor: {payment.pack.tutor.user.first_name} {payment.pack.tutor.user.last_name} {/* Display the tutor's first_name and last_name */}
              </Text>
            </Box>
          </Box>
          <Box paddingLeft={7} paddingTop={10} paddingRight={1}>
          <Badge variant='solid' colorScheme='blue'>{
                        payment.purchased_at
                          ? new Date(payment.purchased_at).toLocaleDateString()
                          : ""
                      }</Badge>
          </Box>
        </Flex>
      </Box>
    ))}
</TabPanel>

              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>

        {/** Right Panel */}
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: '78vh', lg: '78vh' }}
        >
          <Input
            width={300}
            placeholder="Search for Courses"
            backgroundColor='#ffffff'
            marginLeft={4} marginBottom={5}
            value={searchTerm}
            onChange={handleSearchChange} />

          <Tabs colorScheme="blue" backgroundColor="#ffffff" marginRight={5} border="0.05px solid #DAE6F0" borderRadius={15} marginLeft={4} height='73vh' overflowY='scroll'>
            <TabList gap={10} marginLeft={5}>
              <Tab fontSize={13} fontWeight='medium'>Pending</Tab>
              <Tab fontSize={13} fontWeight='medium'>Expired</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid p="10px" columns={4} spacing={10} minChildWidth="250px">
                {studentDetails.student_purchase_studypack
    .filter((payment) =>  payment.status === "PENDING" && payment.payment_for === "PURCHASE")
    .map((payment) => (
                    <CourseCardComponent
                      key={payment.id}
                      props={{
                        title1: payment.pack.course.title,
                        title2: "Study Pack Title",
                        avatar: payment.pack.tutor.user.profile_picture,
                        name: `${payment.pack.tutor.user.first_name} ${payment.pack.tutor.user.last_name}`,
                        description:payment.pack.tutor.qualifications.join(', '),
                        monthly_fee: payment.pack.price,
                        Courseimg: payment.pack.thumbnail,
                        buttonText: "Make Payment",
                        
                        onButtonClick: () => {
                          setSelectedPaymentId(payment.id); // Store the payment.id
                          onOpenFirstTab(); // Open the modal
                        },
                        borderColor: "#DAE6F0",
                        borderRadius: 15,
                        badgeContent: `Expire date: ${new Date(payment.expire_date).toLocaleDateString()}`,
                        colorBadge1: "red",
                        colorBadge2: "green",
                        fontWeight: "bold",
                        studypackID: payment.pack.title
                      }}
                    />
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid p="10px" columns={4} spacing={10} minChildWidth="250px">
                {studentDetails.student_purchase_studypack
    .filter((payment) =>  payment.status === "PENDING" && payment.payment_for === "EXTEND")
    .map((payment) => (
                    <CourseCardComponent
                      key={payment.id}
                      props={{
                        title1: payment.pack.course.title,
                        title2: "Study Pack Title",
                        avatar: payment.pack.tutor.user.profile_picture,
                        name: `${payment.pack.tutor.user.first_name} ${payment.pack.tutor.user.last_name}`,
                        description:payment.pack.tutor.qualifications.join(', '),
                        monthly_fee: payment.pack.price,
                        Courseimg: payment.pack.thumbnail,
                        buttonText: "Make Payment",
                        onButtonClick: () => {
                          setSelectedExtendPaymentId(payment.id); // Store the payment.id
                          onOpenSecondTab(); // Open the modal
                        },
                        borderColor: "#DAE6F0",
                        borderRadius: 15,
                        badgeContent: `Expire date: ${new Date(payment.expire_date).toLocaleDateString()}`,
                        colorBadge1: "red",
                        colorBadge2: "green",
                        fontWeight: "bold",
                        studypackID: payment.pack.title
                      }}
                    />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>

            {/* Modal of the pending tab*/}
            <Modal isOpen={isOpenFirstTab} onClose={onCloseFirstTab} isCentered={true}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody marginTop={4} marginBottom={2}>
                  <Text fontSize={15}>Are you sure you want to make the payment?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onCloseFirstTab} size="sm">
                    Close
                  </Button>
                 <Button colorScheme="blue" mr={3}  type='submit' size="sm" onClick={handlePaymentUpdate} >
                    Yes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

{/* Modal of the expired tab*/}
            <Modal isOpen={isOpenSecondTab} onClose={onCloseSecondTab} isCentered={true}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody marginTop={4} marginBottom={2}>
                  <Text fontSize={15}>Are you sure you want to make the payment to the second tab?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onCloseSecondTab} size="sm">
                    Close
                  </Button>
                 <Button colorScheme="blue" mr={3}  type='submit' size="sm" onClick={handlePaymentExtend}>
                    Yes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Tabs>
        </GridItem>
      </Grid>
    </div>
  );
}

export default StuPayment;
