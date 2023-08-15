import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import {
  Box,
  Card,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import DonutChartQuiz from "../../components/Quizzes/DonutChartQuiz";
import McqAddingCard from "../../components/mcq/McqAddingCard";
import McqDisplayFromLibraryDrawer from "../../components/Quizzes/McqDisplayFromLibraryDrawer";
import { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import QuizInsideCard from "../../components/Quizzes/QuizInsideCard";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import NewMcqStepper from "../../components/Quizzes/NewMcqStepper";
import { useParams } from "react-router-dom";

export default function CreateQuiz() {

  const axiosPrivate = useAxiosPrivate();

  const {quizId} = useParams();


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

  const [quiz, setQuiz] = useState([]);

  const [mcqs, setMcqs] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axiosPrivate.get(`/quizzes/${quizId}`);
        setQuiz(response.data);
        console.log(response.data);
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
        size={"3xl"}
      />
      <Grid
        margin={{ base: "10px 10px", md: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1180px"
        gap={{ base: 2, md: 4 }}
      >
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <QuizInsideCard quiz={quiz} />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Card
            variant="outline"
            height={{ base: "80px", md: "150px" }}
            display={{ base: "none", md: "block" }}
          >
            <DonutChartQuiz />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 3 }}>
          <McqAddingCard
            handleDrawer={handleDrawer}
            onOpen={onNewMcqPopupOpen}
          />
        </GridItem>
      </Grid>

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
