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
  Spacer
} from '@chakra-ui/react'
import { SearchIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import data from "./data/data.json";
import { Link } from 'react-router-dom';
const payments = data.Payments;

function viewPaymentHistory() {
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
  const paidPayments = payments.filter(payment => payment.payment_status === "Paid" && payment.name === "Dinesh Khan");
  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Box><Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">Student Name</Text></Box>

      <Box>
        <SimpleGrid p="10px" columns={5} spacing={6} minChildWidth={200}>

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
          <Box height="40px">
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
          </Box>
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
          <TableContainer  height="550px" overflowY="scroll" css={scrollbarStyles} >
            <Table variant="simple">
              <TableCaption>Payment History</TableCaption>
              <Thead >
                <Tr fontSize={13}>
                  <Th >Date</Th>
                  <Th >Tutor</Th>
                  <Th >Payment method</Th>
                  <Th >Amount</Th>
                  <Th >Receipt</Th>
                  {/* <Th >Action</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {paidPayments.map((payment) => (
                  <Tr key={payment.payment_id}>
                    <Td fontSize={13}>{payment.purchased_date}</Td>
                    <Td >
                      <Flex gap={4}>
                        <Box>
                        <Avatar src={payment.ProfileImageTutor} />
                        </Box>
                        <Box>
                        <Text fontSize={13} marginTop={2} fontWeight="bold">{payment.course}</Text>
                        <Text fontSize={13}  >{payment.tutor}</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td paddingLeft={-14}>
                      <Text
                      marginLeft={4}
                        textAlign='center'
                        width='120px'
                        fontSize={13}
                        color="white"
                        borderRadius={15}
                        px={2}
                        py={1}
                        bg={payment.payment_type === "Physical" ? "green.500" : "blue.500"}
                      >
                        {payment.payment_type}
                      </Text>
                    </Td>
                    <Td fontSize={13}>{payment.amount}</Td>
                    <Td ><Link to="/staff/cash-receipt"><Icon as={ViewIcon} marginLeft={4}/></Link></Td>
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

export default viewPaymentHistory
