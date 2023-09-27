import { Box, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
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
  Icon,
  Flex,
  Avatar,
  Select,
  Input,
  Spacer,
  Button
} from '@chakra-ui/react'
import { SearchIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import data from "./data/data.json";
import { Link } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";




function ViewPaymentHistory() {
   // Initialize useNavigate hook
   const navigate = useNavigate();

   const  handleViewPhysicalReceipt = (transactionId) => {
     navigate(`/staff/physical-payment-receipt/${transactionId}`);
   };

   const  handleViewOnlineReceipt = (transactionId) => {
    navigate(`/staff/online-payment-receipt/${transactionId}`);
  };

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
  const [paymentDetails, setPaymentDetails] = useState(null);
  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/payment-history/${id}`);
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching staff profile:", error);
      }
    };

    fetchPaymentList();
  }, [axiosPrivate, id]);

  if (!paymentDetails) {
    return <div>Loading...</div>;
  }
  //json

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Box><Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">Student Name</Text></Box>

      <Box>
        <SimpleGrid p="10px" columns={3} spacing={6} minChildWidth={200}>

          <Box height="40px">
            <Input
              placeholder="Search for course"
           
            
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
                <Select  fontSize={13} backgroundColor="white">
                  <option value="name">Date</option>
                  <option value="joinedDate">Tutor Name</option>
                </Select>
                <Spacer mx="2" />
              </Box>
            </Flex>
          </Box>
          {/* <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort Order:
                </Text>
              </Box>
              <Box>
                <Select
               
                  w="max-content"
                  fontSize={13}
                  backgroundColor="white"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Select>
              </Box>
            </Flex>
          </Box> */}
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Filter By Payment Method:
                </Text>
              </Box>
              <Box>
                <Select
                  fontSize={13}
                
                  w="max-content"
                  backgroundColor="white"
                >
                  <option value="">All</option>
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                </Select>
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Filter By Course:
                </Text>
              </Box>
              <Box>
                <Select
                  fontSize={13}
               
                  w="max-content"
                  backgroundColor="white"
                >
                  <option value="">All</option>
                  <option value="Maths">Maths</option>
                  <option value="Biology">Biology</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </Select>
              </Box>
            </Flex> 
            
          </Box>
        </SimpleGrid>
      </Box>

      <SimpleGrid column={1} marginTop={4}>
  <Box backgroundColor="#ffffff" borderRadius={15} border="0.05px solid #DAE6F0" marginLeft={4} marginRight={4}>
    <TableContainer height="550px" overflowY="scroll" css={scrollbarStyles}>
      <Table variant="simple">
        <TableCaption>Payment History</TableCaption>
        <Thead>
          <Tr fontSize={13}>
            <Th>Date</Th>
            <Th>Tutor</Th>
            <Th>Payment method</Th>
            <Th>Payment for</Th>
            <Th>Amount</Th>
            <Th>Receipt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paymentDetails?.student_purchase_studypack.map((payment) => (
            <Tr key={`${payment.student_id}-${payment.pack_id}`}>
              <Td fontSize={13}>{
                        payment.purchased_at
                          ? new Date(payment.purchased_at).toLocaleDateString()
                          : ""
                      }</Td>
              <Td>
                <Flex gap={4}>
                  <Box>
                    <Avatar src={payment.pack.tutor.user.profile_picture} />
                  </Box>
                  <Box>
                    <Text fontSize={13} marginTop={2} fontWeight="bold">
                      {payment.pack.title}
                    </Text>
                    <Text fontSize={13}>
                      {payment.pack.tutor.user.first_name} {payment.pack.tutor.user.last_name}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td paddingLeft={-14}>
                <Text
                  marginLeft={4}
                  textAlign="center"
                  width="120px"
                  fontSize={13}
                  color="white"
                  borderRadius={15}
                  px={2}
                  py={1}
                  bg={payment.type === "PHYSICAL"? "green.500" : "blue.500"}
                >
                  {payment.type}
                </Text>
              </Td>
              <Td fontSize={13}>{payment.payment_for}</Td>
              <Td fontSize={13}>Rs.{payment.ammount}</Td>
              <Td>
                 {payment.type === "PHYSICAL" ? (
                  <Button  variant="outline" colorScheme='blue'  onClick={() => handleViewPhysicalReceipt(payment.id)}>
                    
                    View
                  </Button>
                ) : (
                  <Button  variant="outline" colorScheme='blue' onClick={() => handleViewOnlineReceipt(payment.id)}>
                    
                    View
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
</SimpleGrid>


    </Box>
  )
}

export default ViewPaymentHistory
