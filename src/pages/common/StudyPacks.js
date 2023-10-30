import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import CourseCard from './cards/CourseCard'
import TutorCard from "./cards/TutorCard";
import StudyPackCard from "./cards/StudyPackCard";

function StudyPacks({
  studyPacks,
  type,
  columns = { base: 1, sm: 2, md: 3, lg: 3 }

}) {

  const { minimized } = useOutletContext();
  useEffect(() => {
    console.log(minimized);
    console.log(studyPacks);
  }, []);

  return (
    <Box w={"100%"}>
      <SimpleGrid columns={columns} spacing={8}>
        {studyPacks.map((studyPack) => {
          return (
            <GridItem colSpan={1}>
              <StudyPackCard studyPack={studyPack} type={type} />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default StudyPacks;
