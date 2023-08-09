import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

function ViewTable({ data, tableType, onIconClick }) {
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green.600';
      case 'Pending':
        return 'blue.500';
      case 'Rejected':
        return 'red.500';
      default:
        return 'transparent';
    }
  };

  return (
    <ChakraTable>
      <Thead>
        <Tr>
          <Th fontSize="md" fontWeight="bold">
            ID
          </Th>
          <Th fontSize="md" fontWeight="bold">
            Full Name
          </Th>
          <Th fontSize="md" fontWeight="bold">
            Subject
          </Th>
          <Th fontSize="md" fontWeight="bold">
            Class
          </Th>
          {tableType === 'allRequests' && (
            <Th fontSize="md" fontWeight="bold">
              Status
            </Th>
          )}
          {(tableType === 'Pending' || tableType === 'Rejected') && (
            <Th fontSize="md" fontWeight="bold">
              Action
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((teacher) => (
          <Tr key={teacher.id}>
            <Td fontSize={13}>{teacher.id}</Td>
            <Td fontSize={13}>{teacher.fullName}</Td>
            <Td fontSize={13}>{teacher.subject}</Td>
            <Td fontSize={13}>{teacher.class}</Td>
            {tableType === 'allRequests' && (
              <Td fontSize={13}>
                <Box
                  backgroundColor={getStatusBackgroundColor(teacher.status)}
                  p={1}
                  width={100}
                  borderRadius="lg"
                  textAlign="center"
                  color="white"
                >
                  {teacher.status}
                </Box>
              </Td>
            )}
            {(tableType === 'Pending' || tableType === 'Rejected') && (
              <Td fontSize={13}>
                 <Box ml={6} onClick={() => onIconClick(teacher)}>
                  <ViewIcon size={20} color="gray" />
                </Box>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
}

export default ViewTable;
