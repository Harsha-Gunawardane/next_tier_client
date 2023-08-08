import React from "react";
import { MantineProvider, Textarea } from '@mantine/core';
import { useState,useEffect } from 'react';
import { Stepper,  Group, TextInput, PasswordInput, NumberInput,Code,Select,Radio,FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Box,Text,Heading, HStack,ListItem,UnorderedList,Button } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDisclosure } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";
import { Show, Hide } from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
   
  } from '@chakra-ui/react'


const Addpaper= () => {


  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [coursesdata, setCoursesData] = useState(null);

  const [active, setActive] = useState(0);
  const location = useLocation();
  let id = location.pathname.split("/").pop();


  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('1')

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const form = useForm({
    initialValues: {
    

      subject: '',
      title: '',
      description: '',
      thumbnail: '',
      price: '',
      access_period: '',
      
      subject_area_1: '',
      subject_area_2: '',
      subject_area_3: '',
      subject_area_4: '',
      
   
      course_id:id,
     years:'',
     days:'',
     months:'',
    
      


    },

    validate: (values) => {
      if (active === 0) {
        return {
       

       
             

           

  
                    title:
                    values.title.trim().length < 1
                      ?  'Course Type is Required':values.title.length >25 ? 'Title Too Long' 
                      : null,
    
                      description:
                      values.description.trim().length < 1
                        ? 'Language is Required' :values.description.length >200 ? 'Description Too Long' 
                        : null,

                        // course_id:
                        // values.course_id.trim().length < 1
                        //   ?  'Course Type is Required'
                        //   : null,
    


            
        };
      }

      if (active === 1) {
        return {
       
          subject:
          values.subject.trim().length < 1
            ?  'Subject is Required'
            : null,
  
            thumbnail:
            values.thumbnail.trim().length < 1
              ?  'Course Type is Required'
              : null,

            
                


        };
      }

      return {
     

        price:
        values.price.length < 1 ? "Price is Required" : null,

         days:
        values.days.length < 1 ? "Day is Required" : null,

        months:
        values.months.length < 1 ? "Month is Required" : null,

        years:
        values.years.length < 1 ? "Year is Required" : null,

            
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
  const controller = new AbortController();

  if (!form.validate().hasErrors) {
    try {
      console.log(form.values);

      const subjectAreas = [
        form.values.subject_area_1,
        form.values.subject_area_2,
        form.values.subject_area_3,
        form.values.subject_area_4,
      ];

      const updatedFormValues = {
        ...form.values,
        subject_areas: subjectAreas.filter((area) => area.trim().length > 0),
        subject_area_1: undefined,
        subject_area_2: undefined,
        subject_area_3: undefined,
        subject_area_4: undefined,
        access_period: {
          days: form.values.days,
          months: form.values.months,
          years: form.values.years,
        },
      };

      console.log(updatedFormValues);

      // Step 1: Create a new entry in the studypack table
      const response = await axiosPrivate.post("/tutor/studypack", updatedFormValues);
      const studypackId = response.data.id; // Assuming the response contains the created studypack ID

      console.log('Studypack created with ID:', studypackId);

      // Step 2: Update the course entry by adding the studypack ID to the studypack array
      const courseId = id;
      const courseUpdateData = {
        studypack_ids: [studypackId],
      };

      const courseResponse = await axiosPrivate.put(`/tutor/course/studypack/${courseId}`, courseUpdateData);

      console.log('Course updated with new studypack ID:', studypackId);

      // Step 3: Get the existing price value from the studypack entry
      const existingStudypack = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
      const existingPrice = existingStudypack.data.price;

      // Step 4: Set default content_ids up to week 4 while preserving the existing price
      const defaultContentIds = [
        {
          tute_id: [],
          video_id: [],
        },
        // Repeat the above structure for additional weeks if needed
      ];

      const studypackUpdateData = {
        content_ids: defaultContentIds,
        price: existingPrice, // Preserve the existing price
      };

      const studypackUpdateResponse = await axiosPrivate.put(`/tutor/studypack/${studypackId}`, studypackUpdateData);

      console.log('Studypack content_ids updated with default values:', studypackUpdateResponse);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
};


  

  return (

<>

<Button  fontSize='15px' width={{base:400,xl:700}} height='35px'  onClick={onOpen} >+Add Content</Button>
     
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Add New Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1}>

  


    <Box width='100%' p={1} >
    
   

          <form className="container" onSubmit={handleSubmit}>

           

    <Box bg='white' width='90%' ml='5%' p={5}>
   
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step  description="Profile settings">

        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} h='50px' mb='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />
        <Textarea label="Description" placeholder="Description" {...form.getInputProps('description')}
        
        styles={{
          input: { // Styles for the input element
           
            color: 'black',
            borderRadius: '8px',
            padding: '10px',
            height:'120px',
          },
          label: { // Styles for the label element
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '5px',
          },
       
        }}/>



      
        



    
        </Stepper.Step>

   

        <Stepper.Step  description="Personal information">

        <TextInput label="Subject" placeholder="Subject" {...form.getInputProps('subject')} h='50px' mb='10px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />


           
            <HStack spacing='50px' >

            <TextInput label="Subject Areas" placeholder="Subject area" {...form.getInputProps('subject_area_1')} h='50px' mb='30px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
                width:'200px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />
            
        <TextInput label="" placeholder="Subject area" {...form.getInputProps('subject_area_2')} h='50px' mb='30px' mt='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
                width:'200px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />



            </HStack>

            <HStack spacing='50px'>
            <TextInput label="" placeholder="Subject area" {...form.getInputProps('subject_area_3')} h='50px' mb='10px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
                width:'200px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />

<TextInput label="" placeholder="Subject Area" {...form.getInputProps('subject_area_4')} h='50px' mb='10px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
                width:'200px',
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />
            </HStack>



            <TextInput label="Thumbnail" placeholder="Thumbnail" {...form.getInputProps('thumbnail')} h='50px' mb='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'30px',
              
              },
              label: { // Styles for the label element
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
           
            }} />
    

        </Stepper.Step>



        <Stepper.Step  description="Social media">

       
        <NumberInput
                {...form.getInputProps("price")}
                defaultValue={18}
                placeholder="Price"
                label="Price"
                onKeyPress={(event) => {
                  const isNumber = /[0-9]/.test(event.key);
                  if (!isNumber) {
                    event.preventDefault();
                  }
                }}
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "30px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />



<HStack spacing='40px' mt='20px'>

<NumberInput
                {...form.getInputProps("years")}
                defaultValue={18}
                placeholder="Years"
                label="Access Period"
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "30px",
                    width:'100%'
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />


<NumberInput
                {...form.getInputProps("months")}
                defaultValue={18}
                placeholder="Months"
                label=""
                mt='30px'
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "30px",
                    width:'100%'
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />


<NumberInput
                {...form.getInputProps("days")}
                defaultValue={18}
                placeholder="Days"
                label=""
                mt='30px'
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "30px",
                    width:'100%'
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

</HStack>



     
        </Stepper.Step>


       



            
            <Stepper.Completed>
              <Box>
                <Heading
                  as="h2"
                  fontSize="20px"
                  color="blue"
                  ml="300px"
                  mb="20px"
                ></Heading>
                <Box>
                <UnorderedList>
                <ListItem>
                  <HStack spacing="100px">
                  <Box width="150px">
                      <Text>Title:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey'>
                      {form.values.title}
                      </Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Description:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey'> {form.values.description}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Subject:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey'> {form.values.subject}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Subject Areas:</Text>
                    </Box>
                    <Box width="200px">
                    <Text color="grey">
          {form.values.subject_area_1}
          {form.values.subject_area_2 && `, ${form.values.subject_area_2}`}
          {form.values.subject_area_3 && `, ${form.values.subject_area_3}`}
          {form.values.subject_area_4 && `, ${form.values.subject_area_4}`}
        </Text>
               
                    </Box>
                  </HStack>
                  </ListItem>


                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Price:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'> {form.values.price}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  {/* <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Course:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'>{coursesdata.find((course) => course.id === form.values.course_id)?.title}</Text>
                    </Box>
                  </HStack>
                  </ListItem> */}

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Access Period:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'>Days:{form.values.days}    Months:{form.values.months}    Years:{form.values.years}</Text>
                 
                    </Box>
                  </HStack>
                  </ListItem>

                



             
      </UnorderedList>
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
  );
}

export default Addpaper;