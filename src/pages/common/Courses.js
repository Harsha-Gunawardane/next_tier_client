import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import CourseCard from './cards/CourseCard'
import TutorCard from "./cards/TutorCard";

function Courses({ courses, enrolled }) {

  const { minimized } = useOutletContext();
  useEffect(() => {
    console.log(minimized);
  }, []);

  return (
    <Box w={"100%"}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={8}>
        {courses.map((course) => {
          return (
            <GridItem colSpan={1}>
              <CourseCard course={course} enrolled={enrolled} />
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Courses;
