import { Button } from "@chakra-ui/react";
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
import { useNavigate } from "react-router-dom";

export default function QuizDeleteAlertDialog({
  isOpen,
  onClose,
  quizIdToDelete,
  quizzes,
  setQuizzes,
}) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const cancelRef = useRef();

  const handleConfirmDelete = async () => {
    try {
      await axiosPrivate.delete(`/tutor/quizzes/${quizIdToDelete}`);

      const updatedQuizList = quizzes.filter((quiz) => quiz.id !== quizIdToDelete);
      setQuizzes(updatedQuizList);

      onClose(); // Close the dialog after successful deletion
      navigate("/tutor/quizzes")

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
