import { Box, SimpleGrid, Heading, Card, CardHeader, Flex, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import Complain from "../../components/StaffDashboard/Complain";
import BarChart from "../../components/StaffDashboard/BarChart";
import LineChart from "../../components/StaffDashboard/LineChart";
import Classes from "../../components/StaffDashboard/Class";

function Dashboard() {
  const customColors = ["red", "green", "blue", "purple", "black"];

  return (
    <Box pl={[0, 5, 5]} pr={[0, 5, 5]}>
     <Text fontSize="18px" fontWeight="bold" padding="10px 25px 5px 0"> Dashboard </Text>

      <SimpleGrid columns={[1, 2, 5]} spacing={5} pl={[0, 7, 7]} mb="3" mr="3">
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="red.100" p={2}>
                  <FontAwesomeIcon icon={faUser} color={customColors[0]} size="lg" />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>Students<br />550</Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon icon={faChalkboardUser} color={customColors[1]} size="lg" />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}> Teachers<br /> 25</Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="blue.100" p={2}>
                  <FontAwesomeIcon icon={faBuildingColumns} color={customColors[2]} size="lg" />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}> Staff<br />10</Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon icon={faChalkboard} color={customColors[1]} size="lg" />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}> Classes<br />50 </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="yellow.100" p={2}>
                  <FontAwesomeIcon icon={faBuildingColumns} color={customColors[4]} size="lg" />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}> Halls<br />15</Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={[1, 2, 3]} spacing={3} pr={[0, 10, 25,]} >
      <Box bg="white" gridRow="span 2"  border="1px" borderColor="gray.100" borderRadius="md">
          <Heading as="h1" size="md" mb="1" mt="5" ml="5">Complain Status</Heading>
          <Complain />
        </Box>
        <Box bg="white" height="280px" border="1px" borderColor="gray.100" borderRadius="md">
          <Heading as="h1" size="md" mb="1" mt="5" ml="5">Income Report</Heading>
          <BarChart />
        </Box>

       
        <Box bg="white" gridRow="span 2" border="1px" borderColor="gray.100" borderRadius="md">
          <Heading as="h1" size="md" mb="1" mt="5" ml="5">
          Classes for Today
          </Heading>
          <Classes />
        </Box>
        <Box bg="white" height="230px" border="1px" borderColor="gray.100" borderRadius="md">
          <Heading as="h1" size="md" mb="1" mt="5" ml="5">Attendance Overview</Heading>
          <LineChart />
        </Box>

       

      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
