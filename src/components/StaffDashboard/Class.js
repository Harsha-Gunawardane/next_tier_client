import React from 'react';
import { List, ListItem, Flex, Box } from '@chakra-ui/react';
import data from '../../pages/InstituteStaff/data/data';

function Classes() {
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
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
  return (
    <List spacing={3} mr="3" height="450px" overflowY="scroll" css={scrollbarStyles}>
  {data.classes.map((classItem, index) => (
    <Box key={index} bg="#f2f5f7" mx="25" my="5" borderRadius="lg">
      <ListItem
        fontSize="13px"
        height="85px"
        pr="5" 
      >
        <Flex alignItems="center" flexDirection={['column', 'row']} textAlign={['center', 'left']}>
        <Box width={1} height="9.5vh" bg="blue.600" marginTop={1.5} marginLeft={1.5} borderRadius={10}></Box>
          <Box my="2" ml="3">
            <Box>
              <strong>{`${classItem.subject} `} {classItem.time}</strong>
            </Box>
            <Box fontSize="12px">{` ${classItem.teacher} (${classItem.examYear})`}</Box>
            <Box fontSize="12px" color="gray.500">{classItem.details}</Box>
          </Box>
        </Flex>
      </ListItem>
    </Box>
  ))}
</List>
  );
}

export default Classes;
                   