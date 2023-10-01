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

export default function TutorPapers() {
  const tabFontSize = "17px";

  // const papers = [
  //   {
  //     title: "2023/11/08 - ST003",
  //     type: "Structured Paper",
  //     date: "2023/11/08",
  //     subject_areas:["Inorganic","Organic","Calculation"]

  //   },
  //   {
  //     title: "2023/11/08 - ST003",
  //     type: "Structured Paper",
  //     date: "2023/11/08",
  //     subject_areas:["Inorganic","Organic","Calculation"]
  //   },
  //   {
  //     title: "2023/11/08 - ST003",
  //     type: "Structured Paper",
  //     date: "2023/11/08",
  //     subject_areas:["Inorganic","Organic","Calculation"]
  //   },
  // ];

  const axiosPrivate = useAxiosPrivate();

  const [papers, setPapers] = useState([]);
  const [searchPaper, setSearchPaper] = useState("");

  const {
    isOpen: isNewPaperPopupOpen,
    onOpen: onNewPaperPopupOpen,
    onClose: onNewPaperPopupClose,
  } = useDisclosure();

  useEffect(() => {
    const getPapers = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/papers");
        setPapers(response.data);
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
      <PaperStatsGroup />
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
        maxH={{ base: "230px", sm: "260px" }}
        margin="2px auto"
      >
        {papers
          .filter((paper) =>
            paper.title.toLowerCase().includes(searchPaper.toLowerCase())
          )
          .map((paper) => (
            <NavLink key={paper.paper_id} to={`${paper.paper_id}`}>
              <PaperCard paper={paper} />
            </NavLink>
          ))}
      </SimpleGrid>
    </Box>
  );
}
