import { FormControl, FormLabel, Input, Flex, Button, Box, } from '@chakra-ui/react';
import React, { useState } from 'react';

function Payment() {
  const [setStudentId] = useState('');

 

  const handleCancel = () => {
    // Clear the input field and perform any cancel actions
    setStudentId('');
  };

  return (
    <Box mx={3} my={5} border="0.05px solid #DAE6F0" borderRadius={15}>
    <FormControl ml={8}>
    <FormLabel fontSize={13} mt={5} fontWeight="bold">Student ID :</FormLabel>
     <Input width={200}  placeholder="Enter the Student ID." fontSize={13} bg="white" />
    </FormControl>
      <Flex justifyContent="center" alignItems="center" my={7} >
      <Button onClick={handleCancel} colorScheme="blue" size="sm" ml={20}>
        Search
      </Button>
    </Flex>

    </Box>
  );
}

export default Payment;
