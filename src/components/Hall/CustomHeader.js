import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "../../pages/InstituteStaff/styles/CustomHeader.css";

const CustomHeader = ({ label, onNavigate, onView }) => {
  return (
    <Box className="custom-header">
      <Flex
        direction={{ base: "column", md: "row" }} 
        align="center"
        justifyContent="space-between" 
      >
        {/* custom-header-left */}
        <Flex
          className="custom-header-left"
          direction={{ base: "colunm", md: "row" }} 
          mb={{ base: 4, md: 0 }}
        >
          <Box className="view-buttons">
            <Button onClick={() => onView("month")}>Month</Button>
            <Button onClick={() => onView("week")}>Week</Button>
            <Button onClick={() => onView("day")}>Day</Button>
          </Box>
          <Button ml={{ base: 5, md: 5 }}  border= "2px solid rgb(230, 226, 226)" bg=" #ffffff" onClick={() => onView("agenda")}>
            Agenda
          </Button>
        </Flex>

        {/* custom-header-center */}
        <Flex
          className="custom-header-center"
          mb={{ base: 4, md: 0 }}
          textAlign={{ base: "center", md: "unset" }}
        >
          <span className="rbc-toolbar-label">{label}</span>
        </Flex>

        {/* custom-header-right */}
        <Flex
          className="custom-header-right"
          direction={{ base: "row", md: "row" }} 
          ml={{ base: 8, md: 0 }}
          align="center"
        >
          <Box onClick={() => onNavigate("PREV")}>
            <BiChevronLeft />
          </Box>
          <Button onClick={() => onNavigate("TODAY")}>Today</Button>
          <Box onClick={() => onNavigate("NEXT")}>
            <BiChevronRight />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CustomHeader;
