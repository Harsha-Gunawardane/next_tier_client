import { Box, SimpleGrid, GridItem, Flex, Text } from "@chakra-ui/react";
import Classes from "../../components/StaffDashboard/Class";
import Complain from "../../components/StaffDashboard/Complain";
import Payment from "../../components/StaffDashboard/Payment";
import MiniStat from "../../components/Card/MiniStat";
import MiniStatCardIcon from "../../components/icons/MiniStatCardIcon";

//icons
import { BiBook } from "react-icons/bi";
import { FaChalkboardUser, FaLaptop } from "react-icons/fa6";
import { BiUser, BiChalkboard } from "react-icons/bi";

function Dashboard() {
  return (
    <Box pl={[0, 5, 5]} pr={[0, 5, 5]} backgroundColor="#F9F9F9" width="100%">
      <Text fontSize="18px" fontWeight="bold" padding="10px 25px 5px 0">
        {" "}
        Dashboard{" "}
      </Text>

      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 5 }}
        px={"5px"}
        gridRowGap={"10px"}
        gap={"10px"}
      >
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Registerd Students"
            value="550"
            endContent={<MiniStatCardIcon color={"blue"} icon={BiUser} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Teachers"
            value="25"
            endContent={
              <MiniStatCardIcon color={"green"} icon={FaChalkboardUser} />
            }
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name=" Staff"
            value="110"
            endContent={<MiniStatCardIcon color={"red"} icon={FaLaptop} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Classes"
            value="50"
            endContent={
              <MiniStatCardIcon color={"purple"} icon={BiChalkboard} />
            }
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 1, lg: 1 }}
          display={{ base: "none", lg: "block" }}
        >
          <MiniStat
            name="Available Halls"
            value="15"
            endContent={<MiniStatCardIcon color={"orange"} icon={BiBook} />}
          />
          {/* <CardT /> */}
        </GridItem>
      </SimpleGrid>

      {/* Dashboard Content*/}
      <SimpleGrid columns={[1, 2, 4]} spacing={5} px={[5, 10, 25]} mt={5}>
        {/* Classes Summary Today */}
        <Box gridColumn={{ base: "span 1", md: "span 3", lg: "span 4" }}>
          <Text fontSize={16} fontWeight={"600"} mb="5px">
            Classes Summary Today
          </Text>

          <Box height="41vh">
            <Classes />
          </Box>
        </Box>
        {/* Complain Status */}
        <Box gridColumn={{ base: "span 1", md: "span 2", lg: "span 3" }}>
          <Text fontSize={16} fontWeight={"600"} mb="10px">
            Complain Status
          </Text>
          <Box bg="white" border="1px" borderColor="gray.100" borderRadius="md">
            <Complain />
          </Box>
        </Box>
        {/* Physical Class Payment */}
        <Box gridColumn={{ base: "span 1", md: "span 1", lg: "span 1" }}>
          <Text fontSize={16} fontWeight={"600"} mb="10px">
            Physical Class Payment
          </Text>
          <Box>
            <Payment />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
