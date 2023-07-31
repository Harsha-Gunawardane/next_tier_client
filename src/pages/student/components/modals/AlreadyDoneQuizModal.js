import { Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "../../../../components/ModalLayout";

function AlreadyDoneQuizModal({
  quizname,
  handleGoBack,
  isOpen,
  handleCloseModal,
}) {
  const title = "Quiz is already done!";
  const body = (
    <Flex>
      <Text fontSize={14}>{quizname}</Text>
      <Text fontSize={14} ml={3}>
        is already done.
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

export default AlreadyDoneQuizModal;
