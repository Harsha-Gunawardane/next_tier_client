import { Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "../../../../components/ModalLayout";

function QuizErrorModal({
  title = "Warning!!",
  quizname,
  handleGoBack,
  isOpen,
  message,
  handleCloseModal,
}) {

  const body = (
    <Flex>
      <Text fontSize={14}>{quizname}</Text>
      <Text fontSize={14} ml={3}>
        {message}
      </Text>
    </Flex>
  );
  const footer = (
    <Flex>
      <Button onClick={handleGoBack}>Go back</Button>
    </Flex>
  );

  return (
    <ModalLayout
      title={title}
      body={body}
      footer={footer}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      isCloseable={false}
    />
  );
}

export default QuizErrorModal;
