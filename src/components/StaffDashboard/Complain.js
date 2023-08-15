import React from "react";
import { Box, Text, Badge, Flex, Avatar } from "@chakra-ui/react";
import data from "../../pages/InstituteStaff/data/data";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function Complain() {
  return (
    <Box marginTop={13} marginLeft={13}>
      <Box>
        <TableContainer >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr fontSize={13}>
                <Th textTransform="capitalize">Profile</Th>
                <Th textTransform="capitalize">Status</Th>
                <Th textTransform="capitalize">Complain</Th>
                <Th textTransform="capitalize">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.complain.map((complain) => (
                <Tr key={complain.id} >
                  <Td>
                    <Flex gap={4}>
                      <Avatar src={complain.profileName} />
                      <Text fontSize={13} marginTop={4}>
                        {complain.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Badge variant="solid" colorScheme="green">
                      {complain.status}
                    </Badge>
                  </Td>
                  <Td fontSize={13}>{complain.description}</Td>
                  <Td fontSize={13}>{complain.date}</Td>
                 
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Box display="flex" justifyContent="center" fontSize={12} my={5}>
                <Link to="/staff/complaints">See More....</Link>
              </Box>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Complain;
