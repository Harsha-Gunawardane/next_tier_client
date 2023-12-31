import { Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import QuizCard from "./QuizCard";
import QuizzesHeaderBar from "./QuizzesHeaderBar";

import { NavLink } from "react-router-dom";

function QuizzesTab({ onOpen, quizzes, search, setSearch }) {
  return (
    <>
      <QuizzesHeaderBar search={search} setSearch={setSearch} onOpen={onOpen} />
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="20px"
        paddingBottom="10px"
      >
        Created Quizzes
      </Text>
      <SimpleGrid
        spacing={5}
        minChildWidth={{ base: "320px", sm: "400px" }}
        overflowY="auto"
        maxH={{ base: "230px", sm: "260px" }}
        margin="2px auto"
      >
        {quizzes
          .filter((quiz) =>
            quiz.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((quiz) => (
            <NavLink key={quiz.id} to={`${quiz.id}`}>
              <QuizCard quiz={quiz} />
            </NavLink>
          ))}
      </SimpleGrid>
    </>
  );
}

export default QuizzesTab;
