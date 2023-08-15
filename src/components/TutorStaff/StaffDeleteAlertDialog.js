import { Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

 export default function StaffDeleteAlertDialog({
   isOpen,
   onClose,
   handleDelete,
   staffIdToDelete,
   deleteStaff,
 }) {
  const axiosPrivate = useAxiosPrivate();

   const cancelRef = useRef();

   const handleConfirmDelete = async () => {
    try {
      await axiosPrivate.delete(`/staffs/${staffIdToDelete}`);
      deleteStaff(staffIdToDelete);
      onClose(); // Close the dialog after successful deletion
    } catch (err) {
      console.log(`Error: ${err.message}`);
      onClose(); // Close the dialog even if there's an error
    }}

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
                Remove staff
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