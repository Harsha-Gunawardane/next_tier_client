import { FormControl, FormLabel, Input, Flex, Button, Box, } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Payment() {
  const [setStudentId] = useState('');


  return (
    <Box mx={3} my={5} border="0.05px solid #DAE6F0" borderRadius={15}>
    <FormControl ml={8}>
    <FormLabel fontSize={13} mt={5} fontWeight="bold">Student ID :</FormLabel>
     <Input width={200}  placeholder="Enter the Student ID." fontSize={13} bg="white" />
    </FormControl>
      <Flex justifyContent="center" alignItems="center" my={7} >
        <Link to="/staff/stu-payment">
      <Button  colorScheme="blue" size="sm" ml={20}>
        Search
      </Button>
      </Link>
    </Flex>

    </Box>
  );
}

export default Payment;
