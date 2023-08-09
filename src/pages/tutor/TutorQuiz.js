import { Box, Card, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import DonutChartQuiz from "../../components/Quizzes/DonutChartQuiz";
import { useEffect, useState } from "react";
import QuizInsideCard from "../../components/Quizzes/QuizInsideCard";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import QuizMcqsView from "../../components/Quizzes/QuizMcqsView";
import QuizMcqsHeaderBar from "../../components/Quizzes/QuizMcqsHeaderBar";
import McqDisplayFromLibraryDrawer from "../../components/Quizzes/McqDisplayFromLibraryDrawer";
import NewMcqStepper from "../../components/Quizzes/NewMcqStepper";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";

export default function TutorQuiz() {

  const { quizId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [quiz, setQuiz] = useState([]);

  const [mcqs, setMcqs] = useState([]);
  const [search, setSearch] = useState("");

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isNewMcqPopupOpen,
    onOpen: onNewMcqPopupOpen,
    onClose: onNewMcqPopupClose,
  } = useDisclosure();

  const handleDrawer = () => {
    onDrawerOpen();
  };

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axiosPrivate.get(`/quizzes/${quizId}`);
        setQuiz(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getQuiz();
  }, []);

  useEffect(() => {
    const getMcqs = async () => {
      try {
        const response = await axiosPrivate.get("/mcqs");
        setMcqs(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getMcqs();
  }, []);

  return (
    <Box width="100%">
      <BreadCrumbs />
      <ModalPopupCommon
        isOpen={isNewMcqPopupOpen}
        onOpen={onNewMcqPopupOpen}
        onClose={onNewMcqPopupClose}
        modalHeader={"Create a question"}
        modalBody={<NewMcqStepper />}
      />
      <Grid
        margin={{ base: "10px 10px", sm: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1180px"
        gap={{ base: 2, sm: 8 }}
      >
        <GridItem colSpan={{ base: 3, sm: 2 }}>
          <QuizInsideCard quiz={quiz} />
        </GridItem>
        <GridItem colSpan={{ base: 3, sm: 1 }}>
          <Card
            variant="outline"
            height={{ base: "80px", sm: "150px" }}
            display={{ base: "none", md: "block" }}
          >
            <DonutChartQuiz />
          </Card>
        </GridItem>
      </Grid>
      <QuizMcqsHeaderBar
        search={search}
        setSearch={setSearch}
        handleDrawer={handleDrawer}
        onOpen={onNewMcqPopupOpen}
      />

      <QuizMcqsView
        mcqs={mcqs.filter((mcq) =>
          mcq.question.toLowerCase().includes(search.toLowerCase())
        )}
        // handleDeleteMcq={handleDeleteMcq}
      />

      <McqDisplayFromLibraryDrawer
        mcqs={mcqs}
        setMcqs={setMcqs}
        search={search}
        setSearch={setSearch}
        isOpen={isDrawerOpen}
        onOpen={onDrawerOpen}
        onClose={onDrawerClose}
      />
    </Box>
  );
}
