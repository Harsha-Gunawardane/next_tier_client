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
  

 




const Contentedit = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
    <IconButton aria-label='Search database' bg='white'  size={5}  onClick={onOpen} icon={<EditIcon />} />
     
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Content Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize='15px'>Title</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Discription</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Thumbnail</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Course</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Visibility</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

          </ModalBody>

          <ModalFooter>
     
            <Button colorScheme='blue' mr={3} fontSize='18px' height='30px'>
              Save
            </Button>
            <Button onClick={onClose} fontSize='18px' height='30px'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



export default Contentedit;