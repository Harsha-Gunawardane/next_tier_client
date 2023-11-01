import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";

import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";
import PaperAddForm from "../../components/TutorStaff/PaperAddForm";
import PapersHeaderBar from "../../components/TutorStaff/PapersHeaderBar";
import { NavLink } from "react-router-dom";
import PaperCard from "../../components/TutorStaff/PaperCard";
import { PaperStatsGroup } from "../../components/TutorStaff/PaperStatsGroup";
import { useParams } from "react-router-dom";


export default function TutorPapers() {

  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [papers, setPapers] = useState([]);
  const [paperCount, setPaperCount] = useState(0);
  const [searchPaper, setSearchPaper] = useState("");

  const [averageMarksMcq, setAverageMarksMcq] = useState(0);
  const [averageMarksStructure, setAverageMarksStructure] = useState(0);

  const {
    isOpen: isNewPaperPopupOpen,
    onOpen: onNewPaperPopupOpen,
    onClose: onNewPaperPopupClose,
  } = useDisclosure();

  useEffect(() => {
    const getPapers = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/papers/course/${courseId}`);
        setPapers(response.data);
        setPaperCount(response.data.length);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getPapers();
  }, []);

  console.log(papers);

  // useEffect(() => {
  //   if (papers) {
  //     papers.map((paper)=>{
  //       if(paper.)

  //     })
  //   }
  // },[papers])

  return (
    <Box w="100%">
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        paddingTop="5px"
      >
        Overview
      </Text>

      <PaperStatsGroup paperCount={paperCount} />

      <ModalPopupCommon
        isOpen={isNewPaperPopupOpen}
        onOpen={onNewPaperPopupOpen}
        onClose={onNewPaperPopupClose}
        modalHeader={"Add a paper"}
        modalBody={
          <PaperAddForm
            onClose={onNewPaperPopupClose}
            papers={papers}
            setPapers={setPapers}
            courseId={courseId}
          />
        }
        size={"2xl"}
      />

      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        paddingTop="10px"
        paddingBottom="5px"
      >
        Papers
      </Text>
      <PapersHeaderBar
        search={searchPaper}
        setSearch={setSearchPaper}
        onOpen={onNewPaperPopupOpen}
      />
      <SimpleGrid
        spacing={5}
        minChildWidth={{ base: "320px", sm: "400px" }}
        overflowY="auto"
        maxH={{ base: "230px", sm: "250px" }}
        margin="2px auto"
      >
        {papers
          .filter((paper) =>
            paper.title.toLowerCase().includes(searchPaper.toLowerCase())
          )
          .map((paper) => (
            <NavLink
              key={paper.paper_id}
              to={`/tutor/papers/paper/${paper.paper_id}`}
            >
              <PaperCard paper={paper} />
            </NavLink>
          ))}
      </SimpleGrid>
    </Box>
  );
}
