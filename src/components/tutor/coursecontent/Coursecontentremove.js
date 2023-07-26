import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,FormControl,
    FormLabel,Input
  } from '@chakra-ui/react'

  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
  import { IconButton } from '@chakra-ui/react'
  import { HamburgerIcon ,EditIcon} from '@chakra-ui/icons'
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'

 




const Coursecontentremove = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} height='20px' fontSize='10px' width='60px'>
        Remove
      </Button>

      <AlertDialog
      mt='100px'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='sm' fontWeight='bold'>
           
            </AlertDialogHeader>

            <AlertDialogBody fontSize='15px'>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} fontSize='12px' height='35px'>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3} fontSize='12px'  height='35px'>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}



export default Coursecontentremove;