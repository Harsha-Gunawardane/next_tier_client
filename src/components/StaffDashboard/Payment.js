import { FormControl, FormLabel, Input, Flex, Button, Box, } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Payment() {
  const [setStudentId] = useState('');

 

 

  return (
    <Box mx={[2, 2, 2]} my={2} border="0.05px solid #DAE6F0" borderRadius={15} bg="white" height="25vh">
    <FormControl ml={5} mr={2} mt={8}>
      <FormLabel fontSize={{ base: 12, md: 13 }} fontWeight="bold" mb={3}>
        Student ID :
      </FormLabel>
      <Input
        width={{ base: '90%', md: '80%'}}
        placeholder="Enter the Student ID."
        fontSize={{ base: 12, md: 13 }}
        bg="white"
      />
    </FormControl>
    <Flex justifyContent="center" alignItems="center" my={5}>
    <Link to="/staff/stu-payment">
      <Button colorScheme="blue" size="sm" ml={15}>
        Search
      </Button>
      </Link>
    </Flex>
  </Box>
  );
}

export default Payment;
