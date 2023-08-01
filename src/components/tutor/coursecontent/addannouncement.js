
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
    HStack,Textarea
  } from '@chakra-ui/react'
import Announcement from './announcement';
import { useEffect,useState } from "react";
import { useForm } from '@mantine/form';
import { TextInput} from '@mantine/core';
import axios from 'axios';

const Addannouncement = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()



    const[announcementdata,announcementdatachange]=useState(null);
    
  

   
    useEffect(() => {
      fetch("http://localhost:8000/announcement").then((res) => {
          return res.json();
      }).then((resp) => {
          announcementdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [])
  

  const defaultDate = new Date().toISOString().slice(0, 10); // Default to the current date (YYYY-MM-DD)
  const defaultTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); 


  const form = useForm({
    initialValues: {
      heading: "",
      message: "",
      date: defaultDate,
      time: defaultTime,
    },
    

    validate: {
      heading: (value) => (value.length < 1 ? 'Heading Required' : value.length > 20 ? 'Heading Too Long':null),
      message: (value) => (value.length < 1 ? 'Message Required' : value.length > 30 ? 'Message Too Long' :null),
     
    },
  });
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure that the form is valid before submitting
    if (!form.validate().hasErrors) {
      try {
        console.log(form.values)
        // Send the form values to the Firebase Cloud Function using Axios POST request
        const response = await axios.post("http://localhost:8000/announcement", form.values);
        // Handle success or show a success message to the user
        console.log('Form data submitted successfully!');
     

      } catch (error) {
        // Handle error or show an error message to the user
        console.error('Error sending data:', error);
      }
    }
  };

    return (

        <>
      <Button ref={btnRef}  onClick={onOpen}  width='60%' height='35px' mb='10px' ml='130px' mt='25px' fontSize='12px' colorScheme='blue'>
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

          <form onSubmit={handleSubmit}>
        <TextInput
         
          label="Heading"
          placeholder="Heading"
          {...form.getInputProps('heading')}
        />

<TextInput
         
          label="Message"
          placeholder="Message"
          {...form.getInputProps('message')}
        />
       


        
            <Button variant='outline' mr={3} onClick={onClose} fontSize='15px' height='30px' mt='20px'>
              Cancel
            </Button>
            <Button colorScheme='blue' fontSize='15px' height='30px' mt='20px' type='submit'>Publish</Button>
</form>
<Heading fontSize='15px' mt='60px'>All Announcement</Heading>

{announcementdata != null && announcementdata.length>0 ? announcementdata.map(item => (
            <Box bg='white' mt='20px' p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderLeft='6px solid red'>
        <Text fontSize='16px' color='black'>{item.heading}</Text>
        <Text fontSize='12px' color='grey'>{item.message}</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>{item.date}</Text>
          <Text fontSize='12px'  color='grey'>{item.time}</Text>
        </HStack>
      </Box>
      )): <Box mt='10' ml='40px' ><Heading fontSize='15px' color='grey'>No Announcements</Heading>
    </Box>}
          </DrawerBody>

          <DrawerFooter>
       
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}




export default Addannouncement;