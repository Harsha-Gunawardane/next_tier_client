import { Box, SimpleGrid, Heading, Card, CardHeader, Flex } from "@chakra-ui/react";
import Classes from "../../components/instituteStaff/Class";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import Complain from "../../components/instituteStaff/Complain";
import BarChart from "../../components/instituteStaff/BarChart";
import LineChart from "../../components/instituteStaff/LineChart";


function Dashboard() {
 

  return (
    <Box pl={30}>
      <Heading as="h1" size="lg" mb="2" mt="2">Dashboard</Heading>
      
      <SimpleGrid spacing={20} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" pl={20} mb="3" >
      <Card>
        <CardHeader>
          <Flex alignItems="center">
            <FontAwesomeIcon icon={faUser} />
            <Heading size="md" ml={5}> Students<br />550 </Heading>
          </Flex>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Flex alignItems="center">
            <FontAwesomeIcon icon={faChalkboardUser} />
            <Heading size="md" ml={5}> Teachers<br /> 25</Heading>
          </Flex>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <Flex alignItems="center">
            <FontAwesomeIcon icon={faBuildingColumns} />
            <Heading size="md" ml={5}> Staff<br />10</Heading>
          </Flex>
        </CardHeader>
      </Card>
    </SimpleGrid>
      
      <SimpleGrid columns={2} spacing={3} pl={30} width={1100}>

      <Box bg="white" height="280px" border="1px" borderColor="gray.200" borderRadius="md">
        <Heading as="h1" size="md" mb="1" mt="5" ml="5">Income Report</Heading>
       <BarChart />
        </Box>

        <Box bg="white" height="280px" border="1px" borderColor="gray.200" borderRadius="md">
        <Heading as="h1" size="md" mb="1" mt="5" ml="5">Today Classes</Heading>
        <Classes />
        </Box>

        <Box bg="white" height="230px" border="1px" borderColor="gray.200" borderRadius="md">
        <Heading as="h1" size="md" mb="1" mt="5" ml="5">Attendence Overview</Heading>
        <LineChart />
        </Box>
       
        <Box bg="white" height="230px" border="1px" borderColor="gray.200" borderRadius="md">
        <Heading as="h1" size="md" mb="5" mt="5" ml="5">Complain Status</Heading>
        <Complain />
        </Box>

      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
