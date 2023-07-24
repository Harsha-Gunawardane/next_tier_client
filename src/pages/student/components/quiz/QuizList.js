import React from "react";
import { Box } from "@chakra-ui/react";
import DoneQuizCard from "./DoneQuizCard";

function QuizList({ mb, questions, userAnswers, onItemClick }) {
  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;
    return "Question " + trace;
  };

  return (
    <Box>
      {questions.map((question, index) => {
        const questionNo = getQuestionNo(index);
        const linecolor = userAnswers[index] === questions[index].answer ? "#15BD66" : "#EF7373";
        const bgcolor = userAnswers[index] === questions[index].answer ? "#D3F3D2" : "#FDE6E6";

        return (
          <DoneQuizCard
            key={index}
            i={index}
            time="40s"
            questionname={questionNo}
            linecolor={linecolor}
            bgcolor={bgcolor}
            mb={mb}
            onClick={() => onItemClick(index)} 
          />
        );
      })}
    </Box>
  );
}

export default React.memo(QuizList);
