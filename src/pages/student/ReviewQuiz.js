import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  IconButton,
  Text,
  useBreakpointValue,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AiOutlineUp } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import McqExplaination from "./components/quiz/McqExplaination";
import QuizList from "./components/quiz/QuizList";
import BreadCrumbs from "./components/quiz/BreadCrumbs";
import {
  clickOnQuestion,
  useFetchReviewQuestions,
} from "../../hooks/reduxReducers/fetchReviewQuestions";
import ResultCard from "./components/cards/ResultCard";
import Loading from "../../components/skeleton/Loading";
import SearchBar from "./components/SearchBar";

function formatQuizName(str) {
  // Check if the input string starts with a number followed by a hyphen
  const regex = /^(\d+)-/;
  const match = str.match(regex);

  // If there is a match, extract the number and concatenate it with '#'
  if (match && match[1]) {
    const number = match[1];
    return `#${number} ${str.slice(match[0].length)}`;
  }

  return str;
}

const ReviewQuiz = () => {
  const dispatch = useDispatch();
  const { subject, mcqname } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading } = useFetchReviewQuestions(subject, mcqname);
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false); // State to track mobile view

  const state = useSelector((state) => state);
  const trace = useSelector((state) => state.reviewQuiz.trace);
  const question = useSelector(
    (state) => state.reviewQuiz.queue[state.reviewQuiz.trace]
  );
  const pickedAnswer = useSelector(
    (state) => state.reviewQuiz.answers[state.reviewQuiz.trace]
  );

  const questions = useSelector((state) => state.reviewQuiz.queue);
  const userAnswers = useSelector((state) => state.reviewQuiz.answers);

  // get result card details from store
  const mark = useSelector((state) => state.reviewQuiz.mark);
  const dateDetails = useSelector((state) => state.reviewQuiz.dateDetails);

  useEffect(() => {
    console.log(state);

    // Check if the window width is less than 700px to determine mobile view
    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 900);
      setIsBoxVisible(window.innerWidth < 900);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Call handleWindowResize once on initial render
    handleWindowResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [state]);

  const isMobilePhone = useBreakpointValue({ base: true, md: false });

  if (isLoading) {
    return <Loading />; // Return the Loading component, not just rendering it
  }

  if (!question) {
    return <Text>No question found.</Text>;
  }

  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;
    return "Question " + trace;
  };

  const handleQuizItemClick = (index) => {
    console.log("Clicked on Quiz item: ", index);
    dispatch(clickOnQuestion(index));
  };

  const handleToggleBox = () => {
    setIsBoxVisible((prevValue) => !prevValue);
  };

  const drawer = isMobilePhone && (
    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius={30}>
      <DrawerHeader borderBottomWidth="1px">
          <Text fontSize={20} mt={2} color="#555555">
            Quiz revision
          </Text>
        </DrawerHeader>
        <DrawerBody >
          <Flex justifyContent="center">
            <Flex flexDirection="column" gap={5}>
              <ResultCard
                mark={mark}
                quizname={formatQuizName(mcqname)}
                dateDetails={dateDetails}
              />

              <Box minH={160} maxH={160} overflowY="auto">
                <QuizList
                  mb={2}
                  questions={questions}
                  userAnswers={userAnswers}
                  onItemClick={handleQuizItemClick}
                  h={160}
                />
              </Box>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Flex w="100%" justifyContent="space-between" opacity={1}>
      <Box>
        <BreadCrumbs />
        <McqExplaination
          questionNo={getQuestionNo(trace)}
          {...question}
          pickedAnswer={pickedAnswer}
        />
      </Box>

      {isMobilePhone && (
        <Button mt="calc(100vh - 102px)" mr={3} onClick={onOpen}>
          <AiOutlineUp />
        </Button>
      )}

      {isMobileView && !isMobilePhone && (
        <IconButton
          display={{ base: "block", lg: "none" }}
          icon={isBoxVisible ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          aria-label="Toggle Box"
          onClick={handleToggleBox}
          position="absolute"
          right="0rem"
          mt={4}
          mb={2}
          zIndex="1"
        />
      )}

      <Box
        mt={16}
        position="fixed"
        top="4rem"
        right={isBoxVisible ? "-30rem" : "0"}
        mr={8}
        maxH="calc(100vh - 30px)"
      >
        <Flex justifyItems="center" w={240}>
          <Flex flexDirection="column" gap={5}>
            <ResultCard
              mark={mark}
              quizname={formatQuizName(mcqname)}
              dateDetails={dateDetails}
            />

            <QuizList
              mb={2}
              questions={questions}
              userAnswers={userAnswers}
              onItemClick={handleQuizItemClick}
              h="calc(100vh - 310px)"
            />
          </Flex>
        </Flex>
      </Box>
      {drawer}
    </Flex>
  );
};

export default ReviewQuiz;
