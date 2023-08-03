import { Box, Text,Grid,GridItem, Image, SimpleGrid,Flex, Divider } from '@chakra-ui/react'
import React from 'react'
import Logo from './logo.png'
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
} from '@chakra-ui/react'


function cashReceipt(props) {
  return (
   <Box  bg="white"  border="0.05px solid #DAE6F0">
     <Grid templateColumns="repeat(8, 1fr)" gap={0} bg="#BEE3F8" >
        {/**Grid Item 1 */}
        <GridItem
          w="100%"
          h={{ base: '7vh', lg: '11vh' }}
          colSpan={{ base: 8, lg: 2, xl: 2 }}
         
          
        >
            <Image src={Logo} width={180} height={50} mt={3} ml={{lg:"18px",base:"110px"}} ></Image>
        </GridItem>
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: '9vh', lg: '11vh' }}
       
        >  
        <Box marginLeft={{lg:"550px",base:"6px"}} mt={3} display={{base:"flex"}} flexDirection={{base:"column"}} alignItems={{base:"center"}}>
        <Text fontSize={12} fontWeight="bold">{props.header_title1}</Text>
        <Text fontSize={11}>{props.address}</Text>
        <Text fontSize={11}>{props.email}</Text>
        <Text fontSize={11}>{props.phone_number}</Text>
        </Box>
         </GridItem>
    </Grid>

    <SimpleGrid columns={1}>
      <Box mt={4}>
        <Flex justify="space-around">
        <Text fontSize="small">{props.cash_receipt_number}</Text>
        <Text fontSize="small">{props.date}</Text>
        </Flex>
      </Box>
    </SimpleGrid>
    <Divider mt={2}></Divider>
    <SimpleGrid columns={1}>
      <Box mt={4} ml={18}>
        <Flex>
        <Text fontSize="small" fontWeight="bold">Name of the Organization:</Text>
        <Text fontSize="small" ml={3}>NextTier Education</Text>
        </Flex>
        <Flex mt={2}>
        <Text fontSize="small" fontWeight="bold">Name of the Student:</Text>
        <Text fontSize="small" ml={3}>{props.name_stu}</Text>
        </Flex>
        <Flex mt={2}>
        <Text fontSize="small" fontWeight="bold">Stream of the Student:</Text>
        <Text fontSize="small" ml={3}>{props.stream}</Text>
        </Flex>
        <Flex mt={2}>
        <Text fontSize="small" fontWeight="bold">Tutor:</Text>
        <Text fontSize="small" ml={3}>{props.tutor}</Text>
        <Text fontSize="small" ml={1}>({props.qualifications})</Text>
        </Flex>
      </Box>
    </SimpleGrid>
    <SimpleGrid columns={1}>
      <Box mt={10} ml={18} mr={18}>
      <TableContainer>
  <Table variant='striped' colorScheme='blue' border="0.05px solid #DAE6F0">
    {/* <TableCaption></TableCaption> */}
    <Thead>
      <Tr>
        <Th fontFamily="sans-serif">Course</Th>
        <Th fontFamily="sans-serif">Study pack ID</Th>
        <Th fontFamily="sans-serif">Expire Date</Th>
        <Th fontFamily="sans-serif">Amount</Th>
        <Th fontFamily="sans-serif">Paid Amount</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td  fontSize="small" >{props.course}</Td>
        <Td  fontSize="small">{props.study_packID}</Td>
        <Td  fontSize="small">{props.expire_date}</Td>
        <Td  fontSize="small">{props.amount}</Td>
        <Td  fontSize="small">{props.paid_amount}</Td>     
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th></Th>
        <Th></Th>
        <Th></Th>
        <Th  fontSize="small" fontFamily="sans-serif">Total</Th>
        <Th  fontSize="small" fontFamily="sans-serif">{props.paid_amount}</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
      </Box>
    </SimpleGrid>
    <SimpleGrid columns={1}>
      <Box mt={20} mb={10}>
        <Flex justify="space-around">
        <Text fontSize="small">Signature of the student</Text>
        <Text fontSize="small">Signature of the Institute Staff</Text>
        </Flex>
      </Box>
    </SimpleGrid>
   </Box>
  )
}

export default cashReceipt
