import { Box, SimpleGrid, GridItem, Flex, Text , Button, useToast} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Classes from "../../components/StaffDashboard/Class";
import Complain from "../../components/StaffDashboard/Complain";
import Payment from "../../components/StaffDashboard/Payment";
import MiniStat from "../../components/Card/MiniStat";
import MiniStatCardIcon from "../../components/icons/MiniStatCardIcon";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//icons
import { BiBook } from "react-icons/bi";
import { FaChalkboardUser, FaLaptop } from "react-icons/fa6";
import { BiUser, BiChalkboard } from "react-icons/bi";

function Dashboard() {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const [availableHallCount, setAvailableHallCount] = useState(null);
  const [availableStudentCount, setAvailableStudentCount] = useState(null);
  const [availableTutorCount, setAvailableTutorCount] = useState(null);
  const [availableStaffCount, setAvailableStaffCount] = useState(null);
  const [availableClassCount, setAvailableClassCount] = useState(null);

  useEffect(() => {
    // Fetch available hall count 
    axiosPrivate.get('staff/hall/count')
      .then(response => {
        setAvailableHallCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toast, axiosPrivate]);

  useEffect(() => {
    // Fetch available student count
    axiosPrivate.get('staff/student/count')
      .then(response => {
        setAvailableStudentCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toast, axiosPrivate]);

  useEffect(() => {
    // Fetch available tutor count 
    axiosPrivate.get('staff/tutor/count')
      .then(response => {
        setAvailableTutorCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toast, axiosPrivate]);

  useEffect(() => {
    // Fetch available staff count 
    axiosPrivate.get('staff/count')
      .then(response => {
        setAvailableStaffCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toast, axiosPrivate]);

  useEffect(() => {
    // Fetch available class count 
    axiosPrivate.get('staff/class/count')
      .then(response => {
        setAvailableClassCount(response.data.count);
      })
      .catch(error => {
        console.error(error);
      });
  }, [toast, axiosPrivate]);

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
            // value="550"
            value={availableStudentCount !== null ? availableStudentCount : (
              <span style={{ fontSize: '16px' }}>Loading...</span>
            )}
            endContent={<MiniStatCardIcon color={"blue"} icon={BiUser} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Teachering Staff"
            // value="25"
            value={availableTutorCount !== null ? availableTutorCount : (
              <span style={{ fontSize: '16px' }}>Loading...</span>
            )}
            endContent={
              <MiniStatCardIcon color={"green"} icon={FaChalkboardUser} />
            }
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Current Staff"
            // value="110"
            value={availableStaffCount !== null ? availableStaffCount : (
              <span style={{ fontSize: '16px' }}>Loading...</span>
            )}
            endContent={<MiniStatCardIcon color={"red"} icon={FaLaptop} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          <MiniStat
            name="Registerd Classes"
            // value="50"
            value={availableClassCount !== null ? availableClassCount :(
              <span style={{ fontSize: '16px' }}>Loading...</span>
            )}
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
            // value="15"
            value={availableHallCount !== null ? availableHallCount : (
              <span style={{ fontSize: '16px' }}>Loading...</span>
            )}
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
          <Box pl="10px">
            <Button colorScheme="blue" size="md">Download Payment Report </Button>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;