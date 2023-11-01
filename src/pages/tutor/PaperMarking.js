import { useEffect, useState } from "react";
import { Box, Card, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

//Staff Components

import PaperMarkingHeaderBar from "../../components/TutorStaff/PaperMarkingHeaderBar.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import PaperMarkingInsideCard from "../../components/TutorStaff/PaperMarkingInsideCard.js";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon.js";
import { useParams } from "react-router-dom";
import PaperColumnChart from "../../components/TutorStaff/PaperColumnChart.js";
import PaperEditForm from "../../components/TutorStaff/PaperEditForm.js";
import PaperDeleteAlertDialog from "../../components/TutorStaff/PaperDeleteAlertDialog.js";
import PaperMarkingMarksAdding from "../../components/TutorStaff/PaperMarkingMarksAdding.js";
import PaperMarkingMarksAdded from "../../components/TutorStaff/PaperMarkingMarksAdded.js";
const PaperMarking = () => {
  const { paperId } = useParams();
  console.log(paperId);

  const axiosPrivate = useAxiosPrivate();

  const [students, setStudents] = useState([]);
  const [marksNotAddedStudents, setMarksNotAddedStudents] = useState([]);
  const [marksAddedStudents, setMarksAddedStudents] = useState([]);
  const [paper, setPaper] = useState("");
  const [search, setSearch] = useState("");

  //For column chart
  const [No_of_studnts_got_A, setNo_of_studnts_got_A] = useState(0);
  const [No_of_studnts_got_B, setNo_of_studnts_got_B] = useState(0);
  const [No_of_studnts_got_C, setNo_of_studnts_got_C] = useState(0);
  const [No_of_studnts_got_S, setNo_of_studnts_got_S] = useState(0);
  const [No_of_studnts_got_F, setNo_of_studnts_got_F] = useState(0);

  const columnChartOptions = {
    chart: {
      type: "bar",
    },
    colors: ["#0dbfe5", "#19fc56", "#05ec94", "#f9ad12", "#fc1454"],

    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        "A: Excellent",
        "B: Good",
        "C: Satisfactory",
        "S: Pass",
        "F: Fail",
      ],
      labels: {
        style: {
          colors: ["#0dbfe5", "#19fc56", "#05ec94", "#f9ad12", "#fc1454"],

          fontSize: "12px",
        },
      },
    },
  };

  const {
    isOpen: isEditPaperPopupOpen,
    onOpen: onEditPaperPopupOpen,
    onClose: onEditPaperPopupClose,
  } = useDisclosure();

  const {
    isOpen: isPaperDeleteAlertDialogOpen,
    onOpen: onPaperDeleteAlertDialogOpen,
    onClose: onPaperDeleteAlertDialogClose,
  } = useDisclosure();

  const [paperIdToDelete, setPaperIdToDelete] = useState(null);
  const [paperIdToEdit, setPaperIdToEdit] = useState(null);

  const handleDeletePaper = (id) => {
    try {
      setPaperIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (paperIdToDelete !== null) {
      console.log(paperIdToDelete);
      onPaperDeleteAlertDialogOpen();
    }
  }, [paperIdToDelete]);

  const handleEditPaper = (id) => {
    try {
      setPaperIdToEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (paperIdToEdit !== null) {
      console.log(paperIdToEdit);
      onEditPaperPopupOpen();
    }
  }, [paperIdToEdit]);

  useEffect(() => {
    const getAllStudentsMarks = async () => {
      try {
        const response = await axiosPrivate.get(
          `/stu/students/marks/${paperId}`
        );
        setStudents(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getAllStudentsMarks();
  }, []);

  console.log(students);

  useEffect(() => {
    if (students) {
      students.map((student) => {
        console.log(student.marks[0]);

        if (student.marks[0] > 75) {
          console.log("A");
          setNo_of_studnts_got_A((prevCount) => prevCount + 1);
        } else if (student.marks[0] > 65) {
          setNo_of_studnts_got_B((prevCount) => prevCount + 1);
        } else if (student.marks[0] > 55) {
          setNo_of_studnts_got_C((prevCount) => prevCount + 1);
        } else if (student.marks[0] > 35) {
          setNo_of_studnts_got_S((prevCount) => prevCount + 1);
        } else {
          setNo_of_studnts_got_F((prevCount) => prevCount + 1);
        }
      });
    }
  }, [students, marksNotAddedStudents, marksAddedStudents]);

  useEffect(() => {
    if (students !== null) {
      students.map((student) => {
        if (student.marks.length === 0) {
          setMarksNotAddedStudents((marksNotAddedStudents) => [
            ...marksNotAddedStudents,
            student,
          ]);
        } else {
          setMarksAddedStudents((marksAddedStudents) => [
            ...marksAddedStudents,
            student,
          ]);
        }
      });
    }
  }, [students]);

  useEffect(() => {
    const getPaper = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/papers/${paperId}`);
        setPaper(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getPaper();
  }, []);

  // const [columnChartData, setColumnChartData] = useState([]);

  const [columnChartData, setColumnChartData] = useState([
    {
      name: "No.of Students",
      data: [
        5,
        10,
        15,
        20,
        10,
      ],
    },
  ]);

  console.log(columnChartData);


  useEffect(() => {
      console.log("Here");

      setColumnChartData([
        {
          name: "No.of Students",
          data: [
            No_of_studnts_got_A,
            No_of_studnts_got_B,
            No_of_studnts_got_C,
            No_of_studnts_got_S,
            No_of_studnts_got_F,
          ],
        },
      ]);
  }, []);

  return (
    <Box width="100%">
      <ModalPopupCommon
        isOpen={isEditPaperPopupOpen}
        onOpen={onEditPaperPopupOpen}
        onClose={onEditPaperPopupClose}
        modalHeader={"Edit paper details"}
        modalBody={
          <PaperEditForm
            paperId={paperId}
            paper={paper}
            setPaper={setPaper}
            onClose={onEditPaperPopupClose}
          />
        }
      />

      <PaperDeleteAlertDialog
        isOpen={isPaperDeleteAlertDialogOpen}
        onClose={onPaperDeleteAlertDialogClose}
        paperIdToDelete={paperIdToDelete}
      />
      <Grid
        margin={{ base: "10px 10px", md: "5px auto" }}
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        maxWidth="1240px"
        gap={{ base: 2, md: 3 }}
      >
        <GridItem colSpan={{ base: 4, md: 3 }} rowSpan={2}>
          <PaperMarkingInsideCard
            paper={paper}
            handleDelete={handleDeletePaper}
            handleEdit={handleEditPaper}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={3}>
          <Card
            variant="outline"
            paddingTop="5px"
            hover={{
              boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
            height={{ base: "80px", md: "147px" }}
            display={{ base: "none", md: "block" }}
          >
            <PaperColumnChart
              chartData={columnChartData}
              chartOptions={columnChartOptions}
            />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 3 }} rowSpan={1}>
          <PaperMarkingHeaderBar search={search} setSearch={setSearch} />
        </GridItem>
      </Grid>
      <Card variant="outline" ml="16px" maxWidth="1240px">
        <Tabs>
          <TabList>
            <Tab fontSize="15px" fontWeight={500}>
              Add Marks
            </Tab>
            <Tab fontSize="15px" fontWeight={500}>
              Added Marks
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {marksNotAddedStudents && paper ? (
                <PaperMarkingMarksAdding
                  paper={paper}
                  marksAddedStudents={marksAddedStudents}
                  setMarksAddedStudents={setMarksAddedStudents}
                  setMarksNotAddedStudents={setMarksNotAddedStudents}
                  students={marksNotAddedStudents.filter((student) =>
                    student.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )}
                />
              ) : (
                <></>
              )}
            </TabPanel>
            <TabPanel>
              {marksAddedStudents && paper ? (
                <PaperMarkingMarksAdded
                  paper={paper}
                  marksAddedStudents={marksAddedStudents}
                  setMarksAddedStudents={setMarksAddedStudents}
                  students={marksAddedStudents.filter((student) =>
                    student.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )}
                />
              ) : (
                <></>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

export default PaperMarking;
