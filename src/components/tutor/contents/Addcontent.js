import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,Input,Button
  } from '@chakra-ui/react'


  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
  import { IconButton,Heading,Textarea } from '@chakra-ui/react'
  import { HamburgerIcon ,EditIcon} from '@chakra-ui/icons'

  import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Group, TextInput, NumberInput, Box,FileInput,Select,Radio,Text } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { Stepper, PasswordInput } from '@mantine/core';

 




const Addcontent = (props) => {



  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
    

      subjectareas: '',
      subject: '',
      title: '',
      description: '',
      thumbnail: '',
      type:'',
      filepath: '',
      status: '',
    
      


    },


    validate: (values) => {
      if (active === 0) {
        return {
       

       
             

              type:
              values.type.trim().length < 1
                ?  'Subject is Required'
                : null,
  

          

              

                    title:
                    values.title.trim().length < 1
                      ?  'Course Type is Required'
                      : null,
    
                      description:
                      values.description.trim().length < 1
                        ? 'Language is Required'
                        : null,
    


            
        };
      }

      if (active === 1) {
        return {
       

          subject:
            values.subject.trim().length < 1
              ?  'Course Type is Required'
              : null,
            subjectareas:
            values.subjectareas.trim().length < 1
              ?  'Course Type is Required'
              : null,
                


        };
      }

      return {
        status:
        values.status.trim().length < 1
          ?  'Course Type is Required'
          : null,

          filepath:
          values.filepath.trim().length < 1
            ? 'Language is Required'
            : null,

            thumbnail:
            values.thumbnail.trim().length < 1
              ? 'Language is Required'
              : null,
      };
    },
  });

    
      

     
    
  

  const nextStep = () =>
  setActive((current) => {
    if (form.validate().hasErrors) {
      return current;
    }
    return current < 3 ? current + 1 : current;
  });

const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure that the form is valid before submitting
    if (!form.validate().hasErrors) {
      try {
        console.log(form.values)
        // Send the form values to the Firebase Cloud Function using Axios POST request
        await axios.post('http://localhost:8000/courses', form.values);
        // Handle success or show a success message to the user
        console.log('Form data submitted successfully!');
      } catch (error) {
        // Handle error or show an error message to the user
        console.error('Error sending data:', error);
      }
    }
  };



  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('1')

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
    <Button aria-label='Search database'colorScheme='blue' fontSize='15px' width='150px' height='35px'  onClick={onOpen} >+Add Content</Button>
     
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Add New Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1}>

   







          <Box width='100%' p={10}>
          <form className="container" onSubmit={handleSubmit}>

    <Box bg='white' width='90%' ml='5%' p={5}>
      <Stepper active={active} breakpoint="sm" size={14}>
        <Stepper.Step label="First step" description="Profile settings">


        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} h='50px' mb='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'20px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />

<TextInput label="Title" placeholder="Title" {...form.getInputProps('description')} h='50px' mb='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'20px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />
    
        <Select
  
  label="Type"
  placeholder="Type"
  {...form.getInputProps('type')}
  data={[
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
  ]}
/>



          
     
         








  

    
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
   
  

<TextInput label="Subject" placeholder="Subject" {...form.getInputProps('subject')} />

<TextInput label="Subject Areas" placeholder="Subjectareas" {...form.getInputProps('subjectareas')} />


    
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">

     

        <TextInput label="File Path" placeholder="Monthly Fee" {...form.getInputProps('filepath')}  />

        <TextInput label="Thumbnail" placeholder="Hall ID" {...form.getInputProps('thumbnail')}  />


        <Radio.Group

{...form.getInputProps('status')}
      name="favoriteFramework"
      label="Status"

      withAsterisk
    >
      <Group mt="xs">
        <Radio value="Sinhala" label="Sinhala" />
        <Radio value="English" label="English" />
       
      </Group>
    </Radio.Group>
     
        </Stepper.Step>


        <Stepper.Completed>
        <Box>
    <Heading as="h2" fontSize="lg" mb={2}>
      Completed!
    </Heading>
    <Box>
      <Text>
        Year: {form.values.title}
      </Text>
      <Text>
        Subject: {form.values.description}
      </Text>
      <Text>
        Course Type: {form.values.type}
      </Text>
      <Text>
        Title: {form.values.subject}
      </Text>
      <Text>
        Description: {form.values.subjectareas}
      </Text>
      <Text>
        Day: {form.values.status}
      </Text>
      <Text>
        Time: {form.values.thumbnail}
      </Text>
      <Text>
        Monthly Fee: {form.values.filepath}
      </Text>
    </Box>
  </Box>
        
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        {active === 3 && <Button type='submit'>Submit</Button>}
      </Group>
    </Box>
    </form>
    </Box>








          </ModalBody>

          <ModalFooter>
        
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



export default Addcontent;