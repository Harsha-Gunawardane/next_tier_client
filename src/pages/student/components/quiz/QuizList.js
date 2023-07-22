import { Box } from "@chakra-ui/react";

import DoneQuizCard from "./DoneQuizCard";

function QuizList({ questions, mb }) {
  return (
    <Box>
      {questions.map((question) => (
        <DoneQuizCard
          time={question.time}
          questionname={question.name}
          linecolor={question.linecolor}
          bgcolor={question.bgcolor}
          mb={mb}
        />
      ))}
    </Box>
  );
}

export default QuizList;
