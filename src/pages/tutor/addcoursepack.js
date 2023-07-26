import React from "react";
import { MantineProvider, Textarea } from '@mantine/core';
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, NumberInput,Code,Select,Radio,FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Box,Text,Heading, HStack } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';











const Addcoursepack= () => {





  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
    

      grade: '',
      subject: '',
      medium: '',

      title: '',
      description: '',
      thumbnail: '',

      hallID:'',

      monthlyfee: '',
      startday: '',
    
      


    },

    validate: (values) => {
      if (active === 0) {
        return {
       

       
             

              subject:
              values.subject.trim().length < 1
                ?  'Subject is Required'
                : null,
  

          

                  medium:
                  values.medium.trim().length < 1
                    ? 'Medium is Required'
                    : null,

                    title:
                    values.title.trim().length < 1
                      ?  'Course Type is Required':values.title.length >25 ? 'Title Too Long' 
                      : null,
    
                      description:
                      values.description.trim().length < 1
                        ? 'Language is Required' :values.description.length >75 ? 'Description Too Long' 
                        : null,
    


            
        };
      }

      if (active === 1) {
        return {
       

          grade:
          values.grade.length < 1
            ? 'Year is Required':    (values.grade < 2023 || values.grade >3000)
            ? 'Year should be in range 2023 to 3000'
            : null,
            thumbnail:
            values.thumbnail.trim().length < 1
              ?  'Course Type is Required'
              : null,
                


        };
      }

      return {
        hallID:
        values.hallID.trim().length < 1
          ?  'Course Type is Required'
          : null,

          starday:
          values.startday.trim().length < 1
            ? 'Language is Required'
            : null,

            monthlyfee:
            values.monthlyfee.trim().length < 1
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


  return (


    <Box width='100%' p={10} >
          <form className="container" onSubmit={handleSubmit}>

           

    <Box bg='white' width='90%' ml='5%' p={5}>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">

        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} h='50px' mb='60px'
             styles={{
              input: { // Styles for the input element
               
                color: 'black',
                borderRadius: '8px',
                padding: '10px',
                height:'60px',
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
            height:'160px',
          },
          label: { // Styles for the label element
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '5px',
          },
       
        }}/>

        
        <Select
  
  label="Subject"
  placeholder="Subject"
  {...form.getInputProps('subject')}
  data={[
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
  ]}
/>


<Radio.Group

{...form.getInputProps('medium')}
      name="favoriteFramework"
      label="Medium"

      withAsterisk
    >
      <Group mt="xs">
        <Radio value="Sinhala" label="Sinhala" />
        <Radio value="English" label="English" />
       
      </Group>
    </Radio.Group>
          
     
         








  

    
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
   
        <NumberInput
         {...form.getInputProps('grade')} 
      defaultValue={18}
      placeholder="grade"
      label="grade"
    
    />

<TextInput label="Thumbnail" placeholder="Title" {...form.getInputProps('thumbnail')} />
    
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">

        <TextInput label="Monthly Fee" placeholder="Monthly Fee" {...form.getInputProps('monthlyfee')}  />

        <TextInput label="Hall ID" placeholder="Hall ID" {...form.getInputProps('hallID')}  />

        <TextInput label="Start Date" placeholder="Start Date" {...form.getInputProps('startday')}  />
     
        </Stepper.Step>


        <Stepper.Completed>
        <Box>
    <Heading as="h2" fontSize="lg" mb={2}>
      Completed! Form values:
    </Heading>
    <Box>
      <Text>
        Year: {form.values.title}
      </Text>
      <Text>
        Subject: {form.values.description}
      </Text>
      <Text>
        Course Type: {form.values.subject}
      </Text>
      <Text>
        Language: {form.values.medium}
      </Text>
      <Text>
        Title: {form.values.grade}
      </Text>
      <Text>
        Description: {form.values.thumbnail}
      </Text>
      <Text>
        Day: {form.values.startday}
      </Text>
      <Text>
        Time: {form.values.hallID}
      </Text>
      <Text>
        Monthly Fee: {form.values.monthlyfee}
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
    
  );
}

export default Addcoursepack;