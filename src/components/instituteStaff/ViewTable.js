import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

function ViewTable({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'blue';
      case 'rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle boxSize={5} />;
      case 'pending':
        return <FaClock boxSize={5} />;
      case 'rejected':
        return <FaTimesCircle boxSize={5} />;
      default:
        return null;
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
          <Th fontSize="md" fontWeight="bold">
            Status
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((teacher) => (
          <Tr key={teacher.id}>
            <Td fontSize="md" >{teacher.id}</Td>
            <Td fontSize="md" >{teacher.fullName}</Td>
            <Td fontSize="md" >{teacher.subject}</Td>
            <Td fontSize="md" >{teacher.class}</Td>
            <Td>
  <span style={{ display: 'flex', alignItems: 'center' }}>
    {getStatusIcon(teacher.status)}
    <span style={{ color: getStatusColor(teacher.status), marginLeft: '0.5rem' }}>{teacher.status}</span>
  </span>
</Td>

          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
}

export default ViewTable;
