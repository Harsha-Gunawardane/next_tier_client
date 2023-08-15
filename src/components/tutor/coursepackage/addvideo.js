import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,FormControl,
    FormLabel,Input, IconButton
  } from '@chakra-ui/react'
  import { SmallAddIcon} from '@chakra-ui/icons'
  import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
 




const Addcoursecontent = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button fontSize='12px' size={20} width='80px' height='30px' colorScheme='white' color='black'  icon={<SmallAddIcon/>} onClick={onOpen}>+ Add Video</Button>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Video Content</ModalHeader>
          <ModalCloseButton />

          <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab fontSize='15px'>Add excisting content</Tab>
    <Tab fontSize='15px'>Add new content</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      

    <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize='15px'>Title</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Discription</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} fontSize='18px' height='30px'>
              Save
            </Button>
            <Button onClick={onClose} fontSize='18px' height='30px'>Cancel</Button>
          </ModalFooter>


    </TabPanel>
    <TabPanel>
      


    <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize='15px'>Upload Content</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={4}>
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
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Physics Theory 2024' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Visibility</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Visibility' />
            </FormControl>

           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} fontSize='18px' height='30px'>
              Save
            </Button>
            <Button onClick={onClose} fontSize='18px' height='30px'>Cancel</Button>
          </ModalFooter>


    </TabPanel>
  </TabPanels>
</Tabs>

       
        </ModalContent>
      </Modal>
    </>
  )
}



export default Addcoursecontent;