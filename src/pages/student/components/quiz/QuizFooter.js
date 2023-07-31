import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  moveNextQuestion,
  movePrevQuestion,
} from "../../../../hooks/fetchQuestions";
import ModalLayout from "../../../../components/ModalLayout";

function QuizFooter() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const body = (
    <Box mt={2} mb={5}>
      <Text>Are you all done ?</Text>
    </Box>
  );
  const footer = (
    <Flex mb={3} mr={3}>
      <Button>Submit</Button>
    </Flex>
  );

  const { trace, queue } = useSelector((state) => state.questions);

  const onNext = () => {
    console.log(trace);
    if (trace < queue.length - 1) {
      dispatch(moveNextQuestion());
    }
  };

  const onPrev = () => {
    console.log("on prev");
    if (trace > 0) {
      dispatch(movePrevQuestion());
    }
  };

  return (
    <>
      <Flex mt={3} ml={12} w={820} justifyContent="space-between">
        {trace ? (
          <Flex
            color="#444444"
            fontWeight="medium"
            borderRadius={6}
            justifyContent="center"
            alignItems="center"
            h={12}
            w={120}
            bg="#E9E9E9"
            cursor="pointer"
            onClick={onPrev}
          >
            <Text>Prev</Text>
          </Flex>
        ) : (
          <Flex></Flex>
        )}
        <Flex
          bg="#0074D9"
          color="#FFFFFF"
          fontWeight="medium"
          borderRadius={6}
          justifyContent="center"
          alignItems="center"
          h={12}
          w={120}
          cursor="pointer"
          onClick={trace === queue.length - 1 ? handleOpenModal : onNext}
        >
          <Text>{trace === queue.length - 1 ? "Submit" : "Next"}</Text>
        </Flex>
      </Flex>
      <ModalLayout
        title="Submit quiz!"
        body={body}
        footer={footer}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default QuizFooter;
