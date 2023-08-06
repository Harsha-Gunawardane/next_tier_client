import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DonutChartQuiz from "../../components/Quizzes/DonutChartQuiz";
import McqAddingCard from "../../components/mcq/McqAddingCard";
import McqDisplayFromLibraryDrawer from "../../components/Quizzes/McqDisplayFromLibraryDrawer";
import { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import QuizInsideCard from "../../components/Quizzes/QuizInsideCard";

export default function EditQuiz() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosPrivate = useAxiosPrivate();

  const handleDrawer = () => {
    onOpen();
  };

  const [mcqs, setMcqs] = useState([]);
  const [search, setSearch] = useState("");

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
      <Grid
        margin={{ base: "10px 10px", md: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1180px"
        gap={{ base: 2, md: 4 }}
      >
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <QuizInsideCard />
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
          <McqAddingCard handleDrawer={handleDrawer} />
        </GridItem>
      </Grid>

      <McqDisplayFromLibraryDrawer
        mcqs={mcqs}
        setMcqs={setMcqs}
        search={search}
        setSearch={setSearch}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
}
