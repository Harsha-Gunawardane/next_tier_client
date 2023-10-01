import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function ViewTable({ data, tableType, onIconClick }) {
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "green.600";
      case "PENDING":
        return "blue.500";
      case "REJECTED":
        return "red.500";
      default:
        return "transparent";
    }
  };

  return (
    <ChakraTable variant="simple">
      <Thead>
        <Tr>
          <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
            Full Name
          </Th>
          <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
            Email
          </Th>
          <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
            Subject
          </Th>
          <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
            Class
          </Th>
          {tableType === "allRequests" && (
            <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
              Status
            </Th>
          )}
          {(tableType === "Pending") && (
            <Th fontSize="md" fontWeight="bold" textTransform="capitalize">
              Action
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((teacher) => (
          <Tr key={teacher.id}>
            <Td fontSize={13}> {teacher.tutor.user.first_name} {teacher.tutor.user.last_name}</Td>
            <Td fontSize={13}>{teacher.tutor.email}</Td>
            <Td fontSize={13}>{teacher.subject}</Td>
            <Td fontSize={13}>{teacher.title}</Td>
            {tableType === "allRequests" && (
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
            {(tableType === "Pending") && (
              <Td fontSize={13}>
                <Box ml={6} onClick={() => onIconClick(teacher)}>
                  <EditIcon size={20} color="gray" />
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