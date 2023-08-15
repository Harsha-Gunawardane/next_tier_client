import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import CourseCard from './cards/CourseCard'

function Courses({ courses }) {
  return (
    <Box w={"100%"} p={10}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={8}>
        {courses.map((course) => {
          return (
            <GridItem colSpan={1}>
              <CourseCard course={course}/>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Courses;
