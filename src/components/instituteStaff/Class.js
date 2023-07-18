import React from 'react';
import { List, ListItem, ListIcon, Flex } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import data from '../../pages/InstituteStaff/data/data'; 

function Classes() {
  return (
    <List spacing={3}>
      {data.classes.map((classItem, index) => (
        <ListItem key={index}>
          <Flex alignItems="center">
            <ListIcon as={MinusIcon} ml={10} mr={10} />
            <div>
              <div>{`${classItem.subject} - ${classItem.teacher} (${classItem.examYear})`}</div>
              <div>{classItem.time}</div>
            </div>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
}

export default Classes;
