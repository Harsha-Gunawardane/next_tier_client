import { Button } from "@chakra-ui/react";

import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Removecontent = ({ contentId, onContentRemove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const courseId = location.pathname.split("/").pop();

  const handleDelete = () => {
    axiosPrivate
      .delete(`/tutor/course/public/content/${courseId}/${contentId}`)
      .then((response) => {
        console.log(
          `Content ID ${contentId} removed successfully from course!`
        );
        onClose(); // Close the modal after removing the content
        onContentRemove(contentId); // Notify parent component about content removal
      })
      .catch((error) => {
        console.error("Error removing content:", error);
      });
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        height="20px"
        fontSize="12px"
        p={1.5}
        size={10}
      >
        Remove
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="sm" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody fontSize="15px">
              Are you sure you want to remove this content? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                fontSize="12px"
                height="35px"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                fontSize="12px"
                height="35px"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Removecontent;
