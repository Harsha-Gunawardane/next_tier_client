import { Flex, Button, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const ButtonStyles = {
  backgroundColor: 'blue.400',
  color: 'white',
  borderRadius: '5px',
  _hover: {
    backgroundColor: 'blue.300',
  },
};
function HallSchedule() {
  return (
    <Flex justify="space-between" align="center" mt="5" mr="80px" width="100%">
    <Heading fontSize={20} color="#242424" ml="5">
      Hall Schedule
    </Heading>
  
    <NavLink to="view">
      <Button size="md" sx={ButtonStyles}>
        View Halls
      </Button>
    </NavLink>
  </Flex>
  )
}

export default HallSchedule