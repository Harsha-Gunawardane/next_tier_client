import React from "react";
import {
  AiOutlineHourglass,
  AiOutlineFileDone,
  AiOutlineSafety,
} from "react-icons/ai";
import {
  Flex,
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import components
import Card from "./components/cards/Card";
import SubjectFilterTabsHeader from "./components/SubjectFilterTabsHeader";
import QuizEventList from "./components/quiz/QuizEventList";
import QuizMarkChart from "./components/quiz/QuizMarkChart";
import StartQuizModal from "./components/modals/StartQuizModal";
import SearchBar from "./components/SearchBar";
import PreviousQuizList from "./components/quiz/PreviousQuizList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ModalLayout from "../../components/ModalLayout";

const QUIZ_REVISION_URL = "/stu/quiz-revision";

function searchQuizzes(quizzes, input) {
  const searchTerm = input.toLowerCase();
  const matchingQuizzes = quizzes.filter((quiz) =>
    quiz.quizname.includes(searchTerm)
  );
  return matchingQuizzes;
}

function Quizzes() {
  const axiosPrivate = useAxiosPrivate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let { subject } = useParams();
  if (subject) {
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
  }
  subject = subject ? subject : "Mathematics";

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [previousQuizzes, setPreviousQuizzes] = useState([]);
  const [quizname, setQuizname] = useState("");
  const [focusedSubject, setFocusedSubject] = useState(subject);
  const [isopen, setIsopen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [isAllQuizzes, setIsAllQuizzes] = useState("f");

  const getPreviousQuizzes = async (isAllQuizzes) => {
    const queryString = new URLSearchParams({
      isAll: isAllQuizzes,
      subject: focusedSubject,
    }).toString();

    try {
      const response = await axiosPrivate.get(
        `${QUIZ_REVISION_URL}?${queryString}`
      );
      console.log(response?.data?.responseQuizzes);
      setPreviousQuizzes(response?.data?.responseQuizzes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPreviousQuizzes("f");
  }, [quizname, focusedSubject]);

  const handleCloseModal = () => {
    setIsopen(false);
  };

  const handleOpenModal = () => {
    setIsopen(true);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const drawer = isMobile && (
    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius={30}>
        <DrawerHeader borderBottomWidth="1px">
          <Text fontSize={20} mb={5} mt={2} color="#555555">
            Previous Quizzes
          </Text>
          {
            <SearchBar
              setPreviousQuizzes={setPreviousQuizzes}
              setSearch={setQuizname}
              search={quizname}
            />
          }
        </DrawerHeader>
        <DrawerBody minH={260} maxH={360} overflowY="auto">
          <PreviousQuizList previousQuizzes={previousQuizzes} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  const modalBody = (
    <Flex justifyContent={"center"}>
      <Box maxH={420} overflowY={"scroll"}>
        <SearchBar
          setPreviousQuizzes={setPreviousQuizzes}
          setSearch={setSearchQuery}
          search={searchQuery}
        />
        <Box mt={5} />
        <PreviousQuizList
          previousQuizzes={searchQuizzes(previousQuizzes, searchQuery)}
        />
      </Box>
    </Flex>
  );
  const modalHeader = "Previous Quizzes";

  const handleSeeAllQuizzes = () => {
    // setIsAllQuizzes("t");
    getPreviousQuizzes("t")
    // isMobile ? onOpen : handleModalOpen;
    if (isMobile) {
      onOpen();
    } else {
      handleModalOpen();
    }
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
      <Box w="100%">
        <SubjectFilterTabsHeader
          subjects={["Mathematics", "Physics", "Chemistry"]}
          focusedSubject={focusedSubject}
          setFocusedSubject={setFocusedSubject}
        />
        <Flex justifyContent="space-around" w="100%">
          <Box>
            <Flex flexDirection="column" mt={3}>
              <Flex
                ml={{
                  base: 5,
                  sm: 0,
                  md: 0,
                  lg: 0,
                  xl: 0,
                }}
              >
                <Text
                  color="#6CB86C"
                  fontSize={{
                    base: "20px",
                    sm: "25px",
                    md: "30px",
                    lg: "30px",
                    xl: "30px",
                  }}
                  fontWeight="semibold"
                  mr={2}
                >
                  40 days{" "}
                </Text>
                <Text
                  color="#333333"
                  fontSize={{
                    base: "20px",
                    sm: "25px",
                    md: "30px",
                    lg: "30px",
                    xl: "30px",
                  }}
                  fontWeight="semibold"
                >
                  {" "}
                  more for your exam
                </Text>
              </Flex>
              <Text
                ml={{
                  base: 6,
                }}
                w="90%"
                fontSize={13}
                color="#333333"
                fontWeight="medium"
              >
                ~ Success is the sum of small efforts repeated day in and day
                out.
              </Text>
            </Flex>
            <Flex
              mt={{
                base: 5,
                sm: 8,
                md: 8,
                lg: 8,
                xl: 8,
              }}
              justifyContent="center"
            >
              <Card
                mr={8}
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
                mr={{
                  base: "0px",
                  sm: "8px",
                  md: "8px",
                  lg: "8px",
                  xl: "8px",
                }}
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
                display={{
                  base: "none",
                  sm: "block",
                  md: "block",
                  lg: "block",
                  xl: "block",
                }}
                mr={0}
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
            <Flex
              mt={{
                base: 5,
                sm: 8,
                md: 8,
                lg: 8,
                xl: 8,
              }}
              w="100%"
              justifyContent="space-around"
              mb={{
                base: 3,
              }}
            >
              <Flex
                h={{
                  base: 82,
                  sm: 100,
                  md: 110,
                  lg: 110,
                  xl: 110,
                }}
                pl={{
                  base: 5,
                  sm: 8,
                  md: 10,
                  lg: 10,
                  xl: 10,
                }}
                pr={{
                  base: 5,
                  sm: 8,
                  md: 10,
                  lg: 10,
                  xl: 10,
                }}
                alignItems="center"
                border="1px solid #DDDDDD"
                bg="#F5F5F5"
                borderRadius={8}
              >
                <Text
                  fontSize={{
                    base: 13,
                    sm: 22,
                    md: 23,
                    lg: 23,
                    xl: 23,
                  }}
                  color="#777777"
                  fontWeight="medium"
                >
                  Let examine your knowledge
                </Text>
                <Button
                  fontWeight="medium"
                  ml={{
                    base: 5,
                    sm: 10,
                    md: 10,
                    lg: 10,
                    xl: 10,
                  }}
                  h={{
                    base: 12,
                    sm: 14,
                    md: 14,
                    lg: 14,
                    xl: 14,
                  }}
                  bg="#0074D9"
                  borderRadius={8}
                  pl={5}
                  pr={5}
                  fontSize={{
                    base: 14,
                    sm: 16,
                    md: 18,
                    lg: 18,
                    xl: 18,
                  }}
                  color="#FFFFFF"
                  onClick={handleOpenModal}
                  _hover={{ color: "#555555", backgroundColor: "#E9E9E9" }}
                >
                  Generate Quiz
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box
            // ml={5}
            display={isMobile ? "none" : "block"}
          >
            <Text color="#666666" fontSize={20} fontWeight="semibold" mb={3}>
              Upcomming Quizzes
            </Text>
            <Box h={80} overflowY="scroll">
              <QuizEventList events={events} mb={2} />
            </Box>
          </Box>
        </Flex>
        <Flex
          flexDirection={isMobile ? "column-reverse" : "row"}
          justifyContent="space-around"
        >
          <Box mt={5}>
            <Flex justifyContent="space-between" pl={10} pr={10}>
              <Text mb={5} fontSize={22} fontWeight="semibold" color="#555555">
                Previous Quizzes
              </Text>
              <Button
                style={{
                  background: "#383838",
                  color: "#FFFFFF",
                  _hover: {
                    bg: "#383838",
                    color: "#FFFFFF",
                  },
                  fontWeight: "normal",
                }}
                // color="#333333"
                fontStyle="Roboto"
                fontSize={13}
                onClick={handleSeeAllQuizzes}
              >
                See all
              </Button>
            </Flex>

            <Flex justifyContent="center" w="100%" mb={5}>
              <PreviousQuizList previousQuizzes={previousQuizzes} />
            </Flex>
            {drawer}
          </Box>
          <Flex justifyContent="center">
            <Flex mt={2} justifyContent="center" flexDirection="column">
              <Text
                mb={2}
                ml={5}
                fontSize={20}
                fontWeight="semibold"
                color="#666666"
              >
                Your Progress
              </Text>
              <QuizMarkChart />
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <StartQuizModal
        isOpen={isopen}
        handleCloseModal={handleCloseModal}
        subject={focusedSubject.toLowerCase()}
        quizname="23-quiz"
      />
      <ModalLayout
        isOpen={isModalOpen}
        title={modalHeader}
        body={modalBody}
        handleCloseModal={handleModalClose}
        size="4xl"
      />
    </>
  );
}

export default Quizzes;
