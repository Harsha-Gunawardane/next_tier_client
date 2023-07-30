import QuizEvent from "../cards/QuizEvent";
import { Box } from "@chakra-ui/react";

function QuizEventList({ events, mb }) {
  return (
    <Box>
      {events.map((event) => (
        <QuizEvent
          key={event.key}
          title={event.title}
          date={event.date}
          timerange={event.timerange}
          quizname={event.quizname}
          linecolor={event.linecolor}
          bgcolor={event.bgcolor}
          mb={mb}
        />
      ))}
    </Box>
  );
}

export default QuizEventList;
