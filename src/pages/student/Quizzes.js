import React from "react";
import {
  AiOutlineHourglass,
  AiOutlineFileDone,
  AiOutlineSafety,
} from "react-icons/ai";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

// import components
import Card from "./components/cards/Card";
import SubjectFilterTabsHeader from "./components/SubjectFilterTabsHeader";
import QuizEventList from "./components/quiz/QuizEventList";
import PreviousQuizCard from "./components/cards/PreviousQuizCard";
import QuizMarkChart from "./components/quiz/QuizMarkChart";
import StartQuizModal from "./components/modals/StartQuizModal";

function Quizzes() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const events = [
    {
      key: 1,
      title: "Physics",
      date: "24th December",
      timerange: "14.00 - 15.00",
      quizname: "#23rd Quiz",
      linecolor: "#FFBA52",
      bgcolor: "#FEEDD3",
    },
    {
      key: 2,
      title: "Physics",
      date: "24th December",
      timerange: "14.00 - 15.00",
      quizname: "#23rd Quiz",
      linecolor: "#89C4FF",
      bgcolor: "#E9F8FF",
    },
    {
      key: 3,
      title: "Physics",
      date: "24th December",
      timerange: "14.00 - 15.00",
      quizname: "#23rd Quiz",
      linecolor: "#EF7373",
      bgcolor: "#FFE1E1",
    },
    {
      key: 4,
      title: "Physics",
      date: "24th December",
      timerange: "14.00 - 15.00",
      quizname: "#23rd Quiz",
      linecolor: "#89C4FF",
      bgcolor: "#E9F8FF",
    },
  ];
  return (
    <>
      <Box ml={5}>
        <SubjectFilterTabsHeader
          subjects={["Mathematics", "Physics", "Chemistry"]}
        />
        <Flex>
          <Box w={850}>
            <Flex flexDirection="column" mt={3}>
              <Flex>
                <Text color="#6CB86C" fontSize={30} fontWeight="semibold">
                  40 days{" "}
                </Text>
                <Text
                  color="#333333"
                  fontSize={30}
                  fontWeight="semibold"
                  ml={2}
                >
                  {" "}
                  more for your exam
                </Text>
              </Flex>
              <Text fontSize={13} color="#333333" fontWeight="medium">
                ~ Success is the sum of small efforts repeated day in and day
                out.
              </Text>
            </Flex>
            <Flex mt={8} pl={10}>
              <Card
                mr={12}
                title="Average Mark"
                value={52}
                icon={
                  <AiOutlineHourglass
                    fontSize="30px"
                    fontWeight="bold"
                    color="#FFC83B"
                  />
                }
                color="#FFC83B"
                iconbg="#FDF4E6"
              />

              <Card
                mr={12}
                title="Rank in class"
                value="05"
                icon={
                  <AiOutlineSafety
                    fontSize="30px"
                    fontWeight="bold"
                    color="#15BD66"
                  />
                }
                color="#15BD66"
                iconbg="#D3FFD2"
              />

              <Card
                mr={10}
                title="Completed quizzes"
                value="20"
                icon={
                  <AiOutlineFileDone
                    fontSize="30px"
                    fontWeight="bold"
                    color="#D93400"
                  />
                }
                color="#D93400"
                iconbg="#F5D6D3"
              />
            </Flex>
            <Flex mt={8} justifyContent="center">
              <Flex
                h={110}
                pl={10}
                pr={10}
                alignItems="center"
                border="1px solid #EDEDED"
                bg="#F5F5F5"
                borderRadius={8}
              >
                <Text fontSize={25} color="#777777" fontWeight="medium">
                  Let examine your knowledge
                </Text>
                <Flex
                  alignItems="center"
                  h={14}
                  bg="#0074D9"
                  borderRadius={8}
                  ml={8}
                >
                  <Text
                    fontSize={18}
                    fontWeight="medium"
                    color="#FFFFFF"
                    pl={8}
                    pr={8}
                    cursor="pointer"
                    onClick={handleOpenModal}
                  >
                    Generate Quiz
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box ml={5}>
            <Text color="#666666" fontSize={20} fontWeight="semibold" mb={3}>
              Upcomming Quizzes
            </Text>
            <Box h={80} overflowY='scroll'>
            <QuizEventList events={events} mb={2} />
            </Box>
          </Box>
        </Flex>
        <Flex>
          <Box mt={5} w={850}>
            <Flex justifyContent="left">
              <Text
                ml={10}
                mb={5}
                fontSize={22}
                fontWeight="semibold"
                color="#555555"
              >
                Previous Quizzes
              </Text>
            </Flex>
            <Flex justifyContent='center' w="100%">
              <Flex flexDirection="column">
                <PreviousQuizCard value={78} color="#15BD66" />
                <PreviousQuizCard value={62} color="#FFD466" />
                <PreviousQuizCard value={95} color="#15BD66" />
              </Flex>
            </Flex>
          </Box>
          <Box mt={2}>
            <Text mb={2} ml={5} fontSize={20} fontWeight='semibold' color='#666666'>Your Progress</Text>
            <QuizMarkChart />
          </Box>
        </Flex>
      </Box>

      <StartQuizModal isOpen={isOpen} handleCloseModal={handleCloseModal}/>
    </>
  );
}

export default Quizzes;
