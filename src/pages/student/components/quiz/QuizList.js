import React from "react";
import { Flex } from "@chakra-ui/react";
import DoneQuizCard from "../cards/DoneQuizCard";

function QuizList({ mb, questions, userAnswers, onItemClick, h }) {
  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;
    return "Question " + trace;
  };

  console.log(userAnswers, questions);
  return (
    <Flex
      justifyContent="right"
      flexDirection="column"
      position="relative"
      h={h}
      overflowY='scroll'
    >
      {questions.map((question, index) => {
        const questionNo = getQuestionNo(index);
        const linecolor =
          userAnswers[index] === questions[index].answers
            ? "#15BD66"
            : "#EF7373";
        const bgcolor =
          userAnswers[index] === questions[index].answers
            ? "#D3F3D2"
            : "#FDE6E6";

        return (
          <DoneQuizCard
            key={index}
            i={index}
            time=""
            questionname={questionNo}
            linecolor={linecolor}
            bgcolor={bgcolor}
            mb={mb}
            onClick={() => onItemClick(index)}
          />
        );
      })}
    </Flex>
  );
}

export default React.memo(QuizList);
