import React, { useState } from "react";
import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import { LiaBookSolid } from "react-icons/lia";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

import Card from "../student/components/cards/Card";
import GradeAnalysis from "../../components/DashboardComponents/GradeAnalysis";
import Profile from "../../assests/images/profile.jpg";
import FeesPayment from "./components/FeesPayment";
import AttendDate from "./components/AttendDate";
import ModalLayout from "../../components/ModalLayout";
import Report from "./components/Report";
import "../../assests/css/report.css";
import Logo from "../../assests/images/logo.png";
import Archivement from "./components/Archivement";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [totalFee, setTotalFee] = useState(0);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const attendance = [
    { date: "2nd Feb", attend: true },
    { date: "9th Feb", attend: true },
    { date: "16th Feb", attend: false },
    { date: "23rd Feb", attend: true },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const classes = [
    "Physics 2024 Theory",
    "Chemistry Theory",
    "Mathematics Paper",
  ];

  const currentMonth = new Date().getMonth();

  const generateAndDownloadReport = async () => {
    await setPdfLoading(true);
    try {
      window.print();
      setIsOpen(false);
      setPdfLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const modalBody = (
    <>
      <Report />
      <Flex justifyContent={"right"} className="no-print">
        {pdfLoading ? (
          <Image w={36} src={Logo} />
        ) : (
          <Button onClick={generateAndDownloadReport}>Print & Download</Button>
        )}
      </Flex>
    </>
  );

  return (
    <Box mt={2}>
      <Flex
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        gap={5}
        justifyContent={"space-around"}
      >
        <Box
          mt={3}
          w={{
            base: "100%",
            lg: "60%",
          }}
        >
          <Text
            ml={5}
            fontSize={20}
            fontWeight={"semibold"}
            color={"#333333"}
            mb={2}
          >
            Progress of your child
          </Text>
          <Box
            ml={12}
            mt={3}
            mb={3}
            border={"1px solid #E9E9E9"}
            borderRadius={5}
            p={5}
          >
            <Flex justifyContent={"space-between"}>
              <Flex gap={3} alignItems={"center"}>
                <Image
                  src={Profile}
                  w={54}
                  h={54}
                  objectFit={"cover"}
                  borderRadius={"50%"}
                />
                <Box>
                  <Text fontSize={16} fontWeight={"semibold"} color={"#444444"}>
                    Harsha Gunawardane
                  </Text>
                  <Text fontSize={12} color={"#555555"}>
                    Physical stream
                  </Text>
                </Box>
              </Flex>
              <Button
                transition={"transform 0.3s ease"}
                mr={3}
                p={0}
                borderRadius={"50%"}
                onClick={handleToggle}
              >
                {show ? <FiArrowUp /> : <FiArrowDown />}
              </Button>
            </Flex>
            <Box mt={5} isOpen={show} display={show ? "block" : "none"}>
              <Archivement
                archivement={"Average mark"}
                val1={54}
                val2={42}
                val3={70}
              />
              <Archivement
                archivement={"Completed quizzes"}
                val1={24}
                val2={32}
                val3={40}
              />
              <Archivement
                archivement={"Completed questions"}
                val1={84}
                val2={102}
                val3={90}
              />

              <Flex justifyContent={"right"} gap={2} mt={3}>
                <Flex gap={2}>
                  <Box w={5} h={5} borderRadius={3} bg={"#F4CD95"}></Box>
                  <Text fontSize={13}>Physics</Text>
                </Flex>
                <Flex gap={2}>
                  <Box w={5} h={5} borderRadius={3} bg={"#89C4FF"}></Box>
                  <Text fontSize={13}>Chemistry</Text>
                </Flex>
                <Flex gap={2}>
                  <Box w={5} h={5} borderRadius={3} bg={"#FFDDDD"}></Box>
                  <Text fontSize={13}>Mathematics</Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Flex
            justifyContent={"space-between"}
            mb={6}
            mt={4}
            pr={5}
            alignItems={"center"}
          >
            <Text ml={5} fontSize={14} fontWeight={"semibold"} color={"#555"}>
              Overview
            </Text>
            <Button
              bg={"#0074D9"}
              color={"#FFF"}
              _hover={{
                backgroundColor: "#E9E9E9",
                color: "#444",
                transition: "0.3s",
              }}
              pl={4}
              pr={4}
              fontWeight={"semibold"}
              onClick={handleOpenModal}
            >
              Student report
            </Button>
          </Flex>
          <Flex w={"95%"} justifyContent={"space-around"}>
            <Card
              title={"Courses in Progress"}
              value={"04"}
              color={"#0074D9"}
              icon={
                <LiaBookSolid
                  fontSize="30px"
                  fontWeight="bold"
                  color="#0074D9"
                />
              }
              iconbg={"#CEE8FE"}
            />
            <Card
              title={"Completed Courses"}
              value={"04"}
              color={"#04D900"}
              icon={
                <MdOutlineFileDownloadDone
                  fontSize="30px"
                  fontWeight="bold"
                  color="#04D900"
                />
              }
              iconbg={"#C4FFC3"}
            />
            <Card
              title={"Study Packs"}
              value={"04"}
              color={"#8719DD"}
              icon={
                <TbPackages fontSize="30px" fontWeight="bold" color="#8719DD" />
              }
              iconbg={"#EBD2FF"}
              display={{ base: "none", sm: "block" }}
            />
          </Flex>
          <Text
            ml={5}
            fontSize={18}
            fontWeight={"semibold"}
            color={"#333333"}
            mt={5}
          >
            Grade Analysis
          </Text>
          <GradeAnalysis />
        </Box>
        <Box
          p={5}
          mb={5}
          w={{
            base: "100%",
            lg: "40%",
          }}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"} mb={3}>
            <Text
              fontSize={20}
              fontWeight={"semibold"}
              color={"#333333"}
              mb={2}
            >
              Attendance
            </Text>
            <Flex w={"max-content"} gap={2}>
              <Select placeholder="Class" w={40}>
                {classes.map((clz, i) => {
                  return (
                    <option key={i} selected={i === 0} value={clz}>
                      {clz}
                    </option>
                  );
                })}
              </Select>

              <Select placeholder="Month" w={32}>
                {months.map((month, i) => {
                  return (
                    <option key={i} selected={currentMonth === i} value={month}>
                      {month}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
          <Box p={5}>
            <Flex w={"100%"}>
              {attendance.map((attend, index) => {
                return (
                  <AttendDate
                    key={index}
                    date={attend.date}
                    attended={attend.attend}
                  />
                );
              })}
            </Flex>
          </Box>
          <Text
            // ml={5}
            fontSize={20}
            fontWeight={"semibold"}
            color={"#333333"}
            mb={2}
            mt={5}
          >
            Fees Payment
          </Text>
          <Box border={"1px solid #E9E9E9"} borderRadius={5} w={"100%"}>
            <Text
              ml={5}
              fontSize={14}
              fontWeight={"semibold"}
              color={"#555"}
              mb={4}
              mt={2}
            >
              Registered courses
            </Text>
            <FeesPayment totalFee={totalFee} setTotalFee={setTotalFee} />
            <Flex
              w={"100%"}
              mt={5}
              pr={13}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text ml={5} fontSize={16} fontWeight={"semibold"} color={"#555"}>
                Total fee
              </Text>
              <Text fontSize={20} fontWeight={"semibold"} color={"#343434"}>
                {`Rs ${totalFee}.00`}
              </Text>
            </Flex>
            <Flex w={"95%"} mt={5} justifyContent={"right"}>
              <Button mb={8} color={"#FFF"} bg={"#0074D9"} pl={10} pr={10}>
                Payment
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <ModalLayout
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        size={{ base: "md", sm: "2xl", md: "3xl", lg: "4xl" }}
        body={modalBody}
      />
    </Box>
  );
}

export default Dashboard;
