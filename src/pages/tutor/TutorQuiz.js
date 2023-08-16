import {
  Box,
  Card,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import DonutChartQuiz from "../../components/Quizzes/DonutChartQuiz";
import { useEffect, useState } from "react";
import QuizInsideCard from "../../components/Quizzes/QuizInsideCard";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import QuizMcqsHeaderBar from "../../components/Quizzes/QuizMcqsHeaderBar";
import McqDisplayFromLibraryDrawer from "../../components/Quizzes/McqDisplayFromLibraryDrawer";
import NewMcqQuizStepper from "../../components/Quizzes/NewMcqQuizStepper";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import McqsView from "../../components/mcq/McqsView";
import McqEditForm from "../../components/mcq/McqEditForm";
import QuizDeleteAlertDialog from "../../components/Quizzes/QuizDeleteAlertDialog";
import QuizEditForm from "../../components/Quizzes/QuizEditForm";
import McqDeleteFromQuizAlertDialog from "../../components/mcq/McqDeleteFromQuizAlertDialog";
import McqAddingCard from "../../components/mcq/McqAddingCard";

export default function TutorQuiz() {
  const { quizId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [quiz, setQuiz] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [allMcqs, setAllMcqs] = useState([]);

  const [mcqs, setMcqs] = useState([]);
  const [mcq, setMcq] = useState(null);
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

  const {
    isOpen: isEditMcqPopupOpen,
    onOpen: onEditMcqPopupOpen,
    onClose: onEditMcqPopupClose,
  } = useDisclosure();

  const {
    isOpen: isEditQuizPopupOpen,
    onOpen: onEditQuizPopupOpen,
    onClose: onEditQuizPopupClose,
  } = useDisclosure();

  const {
    isOpen: isMcqDeleteAlertDialogOpen,
    onOpen: onMcqDeleteAlertDialogOpen,
    onClose: onMcqDeleteAlertDialogClose,
  } = useDisclosure();

  const {
    isOpen: isQuizDeleteAlertDialogOpen,
    onOpen: onQuizDeleteAlertDialogOpen,
    onClose: onQuizDeleteAlertDialogClose,
  } = useDisclosure();

  const handleDrawer = () => {
    onDrawerOpen();
  };

  const [mcqIdToDelete, setMcqIdToDelete] = useState(null);

  const [mcqIdToEdit, setMcqIdToEdit] = useState(null);

  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const [quizIdToEdit, setQuizIdToEdit] = useState(null);

  const handleDeleteQuiz = (id) => {
    try {
      console.log(id);
      setQuizIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (quizIdToDelete !== null) {
      console.log(quizIdToDelete);
      onQuizDeleteAlertDialogOpen();
    }
  }, [quizIdToDelete]);

  const handleEditQuiz = (id) => {
    try {
      console.log(id);
      setQuizIdToEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (quizIdToEdit !== null) {
      console.log(quizIdToEdit);
      onEditQuizPopupOpen();
    }
  }, [quizIdToEdit]);

  const handleDeleteMcq = (id) => {
    try {
      console.log(id);
      setMcqIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (mcqIdToDelete !== null) {
      onMcqDeleteAlertDialogOpen();
    }
  }, [mcqIdToDelete]);

  const handleEditMcq = async (id) => {
    try {
      setMcqIdToEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (mcq !== null) {
      onEditMcqPopupOpen();
    }
  }, [mcq]);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getQuizzes();
  }, []);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getQuiz();
  }, []);

//Get all mcqs
useEffect(() => {
  const getAllMcqs = async () => {
    try {
      const response = await axiosPrivate.get(
        "/tutor/mcqs"
      );
      setAllMcqs(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log("An error occurred:", error.message);
      }
    }
  };

  getAllMcqs();
}, []);



  //Get mcqs in the quiz
  useEffect(() => {
    const getMcqsFromQuiz = async () => {
      try {
        const response = await axiosPrivate.get(
          `/tutor/quizzes/getMcqs/${quizId}`
        );
        setMcqs(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getMcqsFromQuiz();
  }, []);

  useEffect(() => {
    const getmcq = async () => {
      try {
        if (mcqIdToEdit !== null) {
          const response = await axiosPrivate.get(`/tutor/mcqs/${mcqIdToEdit}`);
          setMcq(response.data);
          console.log(response.data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getmcq();
  }, [mcqIdToEdit]);

  console.log(mcqs);

  return (
    <Box width="100%">
      <BreadCrumbs />
      <ModalPopupCommon
        isOpen={isNewMcqPopupOpen}
        onOpen={onNewMcqPopupOpen}
        onClose={onNewMcqPopupClose}
        modalHeader={"Create a question"}
        modalBody={
          <NewMcqQuizStepper
            quiz={quiz}
            setQuiz={setQuiz}
            quizId={quizId}
            mcqs={mcqs}
            setMcqs={setMcqs}
            onClose={onNewMcqPopupClose}
          />
        }
      />
      {mcq ? (
        <ModalPopupCommon
          isOpen={isEditMcqPopupOpen}
          onOpen={onEditMcqPopupOpen}
          onClose={onEditMcqPopupClose}
          modalHeader={"Edit a mcq"}
          size={"3xl"}
          modalBody={
            <McqEditForm
              mcq={mcq}
              mcqId={mcqIdToEdit}
              onClose={onEditMcqPopupClose}
              mcqs={mcqs}
              setMcqs={setMcqs}
            />
          }
        />
      ) : (
        <></>
      )}

      <McqDeleteFromQuizAlertDialog
        isOpen={isMcqDeleteAlertDialogOpen}
        onClose={onMcqDeleteAlertDialogClose}
        mcqIdToDelete={mcqIdToDelete}
        mcqs={mcqs}
        setMcqs={setMcqs}
        quiz={quiz}
        setQuiz={setQuiz}
      />

      <ModalPopupCommon
        isOpen={isEditQuizPopupOpen}
        onOpen={onEditQuizPopupOpen}
        onClose={onEditQuizPopupClose}
        modalHeader={"Edit quiz details"}
        modalBody={
          <QuizEditForm
            quizId={quizId}
            quiz={quiz}
            setQuiz={setQuiz}
            onClose={onEditQuizPopupClose}
          />
        }
      />

      <QuizDeleteAlertDialog
        isOpen={isQuizDeleteAlertDialogOpen}
        onClose={onQuizDeleteAlertDialogClose}
        quizIdToDelete={quizIdToDelete}
        quizzes={quizzes}
        setQuizzes={setQuizzes}
      />
      <Grid
        margin={{ base: "10px 10px", md: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1240px"
        gap={{ base: 2, md: 4 }}
      >
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <QuizInsideCard
            quiz={quiz}
            handleDelete={handleDeleteQuiz}
            handleEdit={handleEditQuiz}
          />
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

      {mcqs.length > 0 ? (
        <McqsView
          mcqs={mcqs.filter((mcq) =>
            mcq.question.toLowerCase().includes(search.toLowerCase())
          )}
          handleDelete={handleDeleteMcq}
          handleEdit={handleEditMcq}
        />
      ) : (
        <></>
      )}

      <McqDisplayFromLibraryDrawer
        quiz={quiz}
        setQuiz={setQuiz}
        allMcqs={allMcqs}
        setAllMcqs={setAllMcqs}
        quizMcqs={mcqs}
        setQuizMcqs={setMcqs}
        quizId={quizId}
        search={search}
        setSearch={setSearch}
        isOpen={isDrawerOpen}
        onOpen={onDrawerOpen}
        onClose={onDrawerClose}
      />
    </Box>
  );
}
