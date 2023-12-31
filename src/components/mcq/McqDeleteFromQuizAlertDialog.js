import { Button, useToast } from "@chakra-ui/react";
import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function McqDeleteFromQuizAlertDialog({
  isOpen,
  onClose,
  handleDelete,
  mcqIdToDelete,
  mcqs,
  setMcqs,
  quiz,
  setQuiz,
}) {

  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();
  const cancelRef = useRef();

  const handleConfirmDelete = async () => {
    try {
      await axiosPrivate.delete(`/tutor/quizzes/deleteMcq/${quiz.id}/${mcqIdToDelete}`);

      const updatedMcqList = mcqs.filter((mcq) => mcq.id !== mcqIdToDelete);
      setMcqs(updatedMcqList);

       setQuiz((prevQuiz) => ({
         ...prevQuiz,
         number_of_questions: prevQuiz.number_of_questions - 1,
         question_ids: prevQuiz.question_ids.filter(
           (id) => id !== mcqIdToDelete
         ),
       }));

      onClose(); // Close the dialog after successful deletion

      toast({
          title: "Mcq deleted.",
          description: `Mcq deleted from the ${quiz.title} succesfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

    } catch (err) {
      console.log(`Error: ${err.message}`);
      onClose(); // Close the dialog even if there's an error
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove mcq
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
