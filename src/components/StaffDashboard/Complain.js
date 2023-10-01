import React, { useState, useEffect } from "react";
import { Box, Text, Badge, Flex, Avatar } from "@chakra-ui/react";
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
  useToast,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Complain() {
  const toast = useToast();
  const [complainData, setComplainData] = useState([]);
  const [firstThreeComplaints, setFirstThreeComplaints] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const response = await axiosPrivate.get("/staff/complaints", {});

        // Set all complaints in the state
        setComplainData(response.data);

        // Set the first three complaints to display initially
        setFirstThreeComplaints(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching complain details:", error.response.data);
        toast({
          title: "Error",
          description: "Error fetching complain details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchComplains();
  }, [toast, axiosPrivate]);

  // Define a function to format the date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

  return (
    <Box marginTop={13} marginLeft={13}>
      <Box>
        <TableContainer>
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
              {firstThreeComplaints.map((complain) => (
                <Tr key={complain.id}>
                  <Td>
                    <Flex gap={4}>
                    <Avatar src={complain.user.profile_picture} />
                      <Text fontSize={13} marginTop={4}>
                        {complain.user.first_name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                  <Badge
                    variant="solid"
                    colorScheme={
                      complain.status === "PENDING"
                        ? "blue"
                        : complain.status === "RESOLVED"
                        ? "green"
                        : complain.status === "IGNORED"
                        ? "red"
                        : "gray" 
                    }
                  >
                    {complain.status}
                  </Badge>
                </Td>
                  <Td fontSize={13}>{complain.message}</Td>
                  <Td fontSize={13}>{formatDate(complain.posted_at)}</Td>
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
