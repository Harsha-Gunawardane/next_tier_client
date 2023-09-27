import { FormControl, FormLabel, Input, Flex, Button, Box,useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Payment() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
 
  const handleViewProfile = () => {
    navigate(`/staff/stu-payment/${username}`);
  };
  //  onChange handler to update the username state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Box mx={[2, 2, 2]} my={2} border="0.05px solid #DAE6F0" borderRadius={15} bg="white" height="25vh">
    <FormControl ml={5} mr={2} mt={8}>
      <FormLabel fontSize={{ base: 12, md: 13 }} fontWeight="bold" mb={3}>
        Student Username :
      </FormLabel>
      <Input
        width={{ base: '90%', md: '80%'}}
        placeholder="Enter the Student ID."
        fontSize={{ base: 12, md: 13 }}
        bg="white"
        value={username}
        onChange={handleUsernameChange}
      />
    </FormControl>
    <Flex justifyContent="center" alignItems="center" my={5}>
   
      <Button 
      colorScheme="blue" 
      size="sm"
       ml={15}
       onClick={handleViewProfile}
       >
        Search
      </Button>
    </Flex>
  </Box>
  );
}

export default Payment;
