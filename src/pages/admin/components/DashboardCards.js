import React from "react";
import Card from "../../student/components/cards/Card";
import { Flex, Box, Text } from "@chakra-ui/react";
import { TbUsers } from "react-icons/tb";
import { RiUserStarLine, RiUserSettingsLine } from "react-icons/ri";
import { FaUserSlash, FaUserShield } from "react-icons/fa";

function DashboardCards() {
  return (
    <Box mt={5}>
      <Text
        fontWeight={"semibold"}
        fontStyle={"Roboto"}
        fontSize={20}
        color={"#444444"}
        ml={10}
      >
        Overview
      </Text>
      <Flex justifyContent={"space-around"} pl={5} pr={5} w={"100%"} mt={3}>
        <Card
          title={"All Users"}
          value={106}
          color={"#0074D9"}
          iconbg={"#CEE8FE"}
          icon={<TbUsers color="#0074D9" fontSize="30px" fontWeight="bold" />}
        />
        <Card
          title={"Online Users"}
          value={56}
          color={"#15BD66"}
          iconbg={"#D3FFD2"}
          icon={
            <RiUserStarLine color="#15BD66" fontSize="30px" fontWeight="bold" />
          }
        />
        <Card
          title={"Active Users"}
          value={84}
          color={"#FFD466"}
          iconbg={"#FDF4E6"}
          icon={
            <RiUserSettingsLine
              color="#FFD466"
              fontSize="30px"
              fontWeight="bold"
            />
          }
        />
        <Card
          title={"Pending Users"}
          value={16}
          color={"#8719DD"}
          iconbg={"#EBD2FF"}
          icon={
            <FaUserShield color="#8719DD" fontSize="30px" fontWeight="bold" />
          }
        />
        <Card
          title={"Blocked Users"}
          value={10}
          color={"#D93400"}
          iconbg={"#F5D6D3"}
          icon={
            <FaUserSlash color="#D93400" fontSize="30px" fontWeight="bold" />
          }
        />
      </Flex>
    </Box>
  );
}

export default DashboardCards;
