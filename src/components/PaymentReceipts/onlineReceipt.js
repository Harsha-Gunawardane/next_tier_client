import { Box, SimpleGrid, Text, Image, Flex, Divider, Icon } from '@chakra-ui/react'
import React from 'react'
import Logo from './logo.png';
import { CheckCircleIcon } from "@chakra-ui/icons";


const leftTextStyle = {
  fontSize: 'small',
  marginLeft: '35px',
  color: 'gray',
};

const rightTextStyle = {
  fontSize: 'small',
  marginRight: '35px',
  fontWeight: "bold",
};

function onlineReceipt(props) {

  return (
    <Box bg="white" border="0.05px solid #DAE6F0" width={{ lg: "45%", base: "100%" }} ml={{ lg: "300px", base: "0px" }}>
      <SimpleGrid columns={1}>
        <Box display="Flex" flexDirection="column" alignItems="center">
          <Image src={Logo} width={140} height={35} mt={3}></Image>
          <Text fontSize={11} mt={2}>{props.addressNextTier}</Text>
          <Text fontSize={11}>{props.email}</Text>
          <Text fontSize={11}>{props.phone_number}</Text>
        </Box>
        <Divider mt={5}></Divider>
        <Box mt={15}>
          <Flex justify="space-between">
            <Text style={leftTextStyle}>Transaction ID</Text>
            <Text style={rightTextStyle}>{props.transaction_id}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Date</Text>
            <Text style={rightTextStyle}>{props.date}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Payment Status</Text>
            <Text style={rightTextStyle}><Icon as={CheckCircleIcon} color="green.500" mr={2} mb={0.5}></Icon>Payment Success</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Time</Text>
            <Text style={rightTextStyle}>{props.time}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Payment Method</Text>
            <Text style={rightTextStyle}>Credit Card</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Student Name</Text>
            <Text style={rightTextStyle}>{props.stu_name}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Student Contact Number</Text>
            <Text style={rightTextStyle}>{props.contact_num}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Stream</Text>
            <Text style={rightTextStyle}>{props.stream}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Course</Text>
            <Text style={rightTextStyle}>{props.course}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Study Pack Title</Text>
            <Text style={rightTextStyle}>{props.stdpck_ID}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Expire Date</Text>
            <Text style={rightTextStyle}>{props.exp_date}</Text>
          </Flex>
          
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Price</Text>
            <Text style={rightTextStyle}>Rs.{props.price}</Text>
          </Flex>
          <Flex justify="space-between" mt={3}>
            <Text style={leftTextStyle}>Total Payment</Text>
            <Text style={rightTextStyle}>Rs.{props.total_payment}</Text>
          </Flex>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3} paddingBottom={3} bg="#BEE3F8" paddingTop={3}>
          <Text fontSize={13} fontWeight="bold">Thank You!</Text>
          <Text fontSize={8} fontStyle="italic">Empowering Education!</Text>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default onlineReceipt
