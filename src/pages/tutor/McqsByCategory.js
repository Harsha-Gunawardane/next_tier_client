import {
  Box,
  Card,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import McqsView from "../../components/mcq/McqsView";
import McqsHeaderBar from "../../components/mcq/McqsHeaderBar";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CategoryInsideCard from "../../components/mcq/CategoryInsideCard";
import DonutChartCategory from "../../components/mcq/DonutChartCategory";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import NewMcqStepper from "../../components/Quizzes/NewMcqQuizStepper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function McqsByCategory() {
  const { categoryId } = useParams();

  console.log(categoryId);

  const axiosPrivate = useAxiosPrivate();

  const handleDeleteMcq = (id) => {};

  const [mcqs, setMcqs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);


  const {
    isOpen: isNewMcqPopupOpen,
    onOpen: onNewMcqPopupOpen,
    onClose: onNewMcqPopupClose,
  } = useDisclosure();


  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/categories/${categoryId}`);
        setCategory(response.data);
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

  //Get mcqs in the quiz
  useEffect(() => {
    const getMcqsFromQuiz = async () => {
      try {
        const response = await axiosPrivate.get(
          `/tutor/categories/getMcqs/${categoryId}`
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
        maxWidth="1240px"
        gap={{ base: 2, sm: 8 }}
      >
        <GridItem colSpan={{ base: 3, sm: 2 }}>
          <CategoryInsideCard category={category} />
        </GridItem>
        <GridItem colSpan={{ base: 3, sm: 1 }}>
          <Card
            variant="outline"
            height={{ base: "80px", sm: "150px" }}
            display={{ base: "none", md: "block" }}
          >
            <DonutChartCategory />
          </Card>
        </GridItem>
      </Grid>
      <McqsHeaderBar
        search={search}
        setSearch={setSearch}
        onOpen={onNewMcqPopupOpen}
      />

      <McqsView
        mcqs={mcqs.filter((mcq) =>
          mcq.question.toLowerCase().includes(search.toLowerCase())
        )}
        handleDeleteMcq={handleDeleteMcq}
      />
    </Box>
  );
}
