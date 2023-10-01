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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NewMcqCategoryStepper from "../../components/mcq/NewMcqCategoryStepper";
import McqEditForm from "../../components/mcq/McqEditForm";
import McqDeleteFromCategoryAlertDialog from "../../components/mcq/McqDeleteFromCategoryAlertDialog";
import CategoryEditForm from "../../components/mcq/CategoryEditForm";
import CategoryDeleteAlertDialog from "../../components/mcq/CategoryDeleteAlertDialog";

export default function McqsByCategory() {
  const { categoryId } = useParams();

  console.log(categoryId);

  const axiosPrivate = useAxiosPrivate();


  const [mcqs, setMcqs] = useState([]);
  const [mcq, setMcq] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);



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
    isOpen: isEditCategoryPopupOpen,
    onOpen: onEditCategoryPopupOpen,
    onClose: onEditCategoryPopupClose,
  } = useDisclosure();

  const {
    isOpen: isMcqDeleteAlertDialogOpen,
    onOpen: onMcqDeleteAlertDialogOpen,
    onClose: onMcqDeleteAlertDialogClose,
  } = useDisclosure();

  const {
    isOpen: isCategoryDeleteAlertDialogOpen,
    onOpen: onCategoryDeleteAlertDialogOpen,
    onClose: onCategoryDeleteAlertDialogClose,
  } = useDisclosure();

  
  const [mcqIdToDelete, setMcqIdToDelete] = useState(null);

  const [mcqIdToEdit, setMcqIdToEdit] = useState(null);

  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

  const handleDeleteCategory = (id) => {
    try {
      console.log(id);
      setCategoryIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (categoryIdToDelete !== null) {
      console.log(categoryIdToDelete);
      onCategoryDeleteAlertDialogOpen();
    }
  }, [categoryIdToDelete]);

  const handleEditCategory = (id) => {
    try {
      console.log(id);
      setCategoryIdToEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (categoryIdToEdit !== null) {
      console.log(categoryIdToEdit);
      onEditCategoryPopupOpen();
    }
  }, [categoryIdToEdit]);

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
    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/categories");
        setCategories(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getCategories();
  }, []);


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

  return (
    <Box width="100%">
      <BreadCrumbs />
      <ModalPopupCommon
        isOpen={isNewMcqPopupOpen}
        onOpen={onNewMcqPopupOpen}
        onClose={onNewMcqPopupClose}
        modalHeader={"Create a question"}
        modalBody={
          <NewMcqCategoryStepper
            category={category}
            setCategory={setCategory}
            categoryId={categoryId}
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

      <McqDeleteFromCategoryAlertDialog
        isOpen={isMcqDeleteAlertDialogOpen}
        onClose={onMcqDeleteAlertDialogClose}
        mcqIdToDelete={mcqIdToDelete}
        mcqs={mcqs}
        setMcqs={setMcqs}
        category={category}
        setCategory={setCategory}
      />

      <ModalPopupCommon
        isOpen={isEditCategoryPopupOpen}
        onOpen={onEditCategoryPopupOpen}
        onClose={onEditCategoryPopupClose}
        modalHeader={"Edit category details"}
        modalBody={
          <CategoryEditForm
            categoryId={categoryId}
            category={category}
            setCategory={setCategory}
            onClose={onEditCategoryPopupClose}
          />
        }
      />

      <CategoryDeleteAlertDialog
        isOpen={isCategoryDeleteAlertDialogOpen}
        onClose={onCategoryDeleteAlertDialogClose}
        categoryIdToDelete={categoryIdToDelete}
        categories={categories}
        setCategory={setCategory}
      />

      <Grid
        margin={{ base: "10px 10px", sm: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1240px"
        gap={{ base: 2, sm: 8 }}
      >
        <GridItem colSpan={{ base: 3, sm: 2 }}>
          <CategoryInsideCard
            category={category}
            handleDelete={handleDeleteCategory}
            handleEdit={handleEditCategory}
          />
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
