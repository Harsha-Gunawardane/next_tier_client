import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import Classes from "../../components/StaffDashboard/Class";
import Complain from "../../components/StaffDashboard/Complain";
import Payment from "../../components/StaffDashboard/Payment";

function Dashboard() {
  const customColors = ["red", "green", "blue", "purple", "black"];

  return (
    <Box pl={[0, 5, 5]} pr={[0, 5, 5]} backgroundColor="#F9F9F9" width="100%">
      <Text fontSize="18px" fontWeight="bold" padding="10px 25px 5px 0">
        {" "}
        Dashboard{" "}
      </Text>

      <SimpleGrid columns={[1, 2, 5]} spacing={5} pl={[0, 5, 5]} mb="8" mr="3">
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="red.100" p={2}>
                  <FontAwesomeIcon
                    icon={faUser}
                    color={customColors[0]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  Students
                  <br />
                  550
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon
                    icon={faChalkboardUser}
                    color={customColors[1]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Teachers
                  <br /> 25
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="blue.100" p={2}>
                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                    color={customColors[2]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Staff
                  <br />
                  10
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon
                    icon={faChalkboard}
                    color={customColors[1]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Classes
                  <br />
                  50{" "}
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
        <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="yellow.100" p={2}>
                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                    color={customColors[4]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Halls
                  <br />
                  15
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
      </SimpleGrid>

      {/* Dashboard Content*/}
      <SimpleGrid columns={[1, 2, 4]} spacing={5} pr={[0, 10, 25]}>
        <Box gridColumn="span 4">
          <Text fontSize={16} fontWeight={"600"} mb="10px">
            Classes Summary Today
          </Text>

          <Box
            bg="white"
            height="45vh"
            border="1px"
            borderColor="gray.100"
            borderRadius="lg"
          >
            <Classes />
          </Box>
        </Box>
        <Box gridColumn="span 3">
        <Text fontSize={16} fontWeight={"600"} mb="10px">
            Complain Status
          </Text>
          <Box
            bg="white"
            border="1px"
            borderColor="gray.100"
            borderRadius="md"
          >
            <Complain />
          </Box>
        </Box>
        <Box  gridColumn="span 1">
        <Text fontSize={16} fontWeight={"600"} mb="10px">
            Physical Class Payment
          </Text>
          <Box
            bg="white"
            border="1px"
            borderColor="gray.100"
            borderRadius="md"
          >
            <Payment />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
