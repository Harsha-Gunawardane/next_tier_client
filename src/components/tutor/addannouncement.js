
import {

    Button,FormControl,
    FormLabel,Input, IconButton,Box, Heading
  } from '@chakra-ui/react'
  import React from "react";
  import { useDisclosure,Text } from '@chakra-ui/react'
  import announcement from "./announcement";



  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    HStack
  } from '@chakra-ui/react'
import Announcement from './announcement';

const Addannouncement = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()





    return (

        <>
      <Button ref={btnRef}  onClick={onOpen}  width='60%' height='35px' mb='10px' ml='120px' mt='25px' fontSize='12px' colorScheme='blue'>
        Add Announcement
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize='20px'>Add Announcement</DrawerHeader>

          <DrawerBody>
            <Input fontSize='15px' placeholder='Add anoouncement' />
            <Button variant='outline' mr={3} onClick={onClose} fontSize='15px' height='30px'>
              Cancel
            </Button>
            <Button colorScheme='blue' fontSize='15px' height='30px'>Publish</Button>

<Heading fontSize='15px' mt='20px'>All Announcement</Heading>
            <Box bg='white' mt='20px' p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderLeft='6px solid red'>
        <Text fontSize='16px' color='grey'>Class is cancelled on 29th July</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.29 P.M.</Text>
        </HStack>
      </Box>
          </DrawerBody>

          <DrawerFooter>
       
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}




export default Addannouncement;