import React from "react";
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Stepper, Button, Group, TextInput,Select,Radio} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Box,Heading } from '@chakra-ui/react'











const Videocontent= () => {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',

      year: '',
      subject: '',
      coursetype: '',
      language: '',

      title: '',
      description: '',

      day: '',
      time: '',
    
      


    },

    validate: (values) => {
      if (active === 0) {
        return {
       

              year:
              values.year.trim().length < 1
                ? 'Year is Required'
                : null,

              subject:
              values.subject.trim().length < 1
                ?  'Subject is Required'
                : null,
  

                coursetype:
                values.coursetype.trim().length < 1
                  ?  'Course Type is Required'
                  : null,

                  language:
                  values.language.trim().length < 1
                    ? 'Language is Required'
                    : null,
    


            
        };
      }

      if (active === 1) {
        return {
       

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

      return {
        day:
        values.day.trim().length < 1
          ?  'Course Type is Required'
          : null,

          time:
          values.time.trim().length < 1
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

  return (



    
    <Box bg='white' width='90%' ml='5%' p={5}>


      <Heading mt='10px' mb='30px' ml='400px'>Course Registration</Heading>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          
          <TextInput label="Year" placeholder="Year" {...form.getInputProps('year')}  style={{  }}/>

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

<Select
      label="Course Type"
      placeholder="Course Type"
      {...form.getInputProps('coursetype')}
      data={[
        { value: 'Theory', label: 'Theory' },
        { value: 'Revision', label: 'Revision' },
        { value: 'Paper', label: 'Paper' },
      
      ]}
    />

<Radio.Group
{...form.getInputProps('language')}
      name="favoriteFramework"
      label="Select your favorite framework/library"
      description="This is anonymous"
      withAsterisk
    >
      <Group mt="xs">
        <Radio value="Sinhala" label="Sinhala" />
        <Radio value="English" label="English" />
       
      </Group>
    </Radio.Group>
    
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
        <TextInput label="Description" placeholder="Description" {...form.getInputProps('description')} />
 
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">

        <TextInput label="Title" placeholder="Title" {...form.getInputProps('day')} />
        <TextInput label="Description" placeholder="Description" {...form.getInputProps('time')} />
        <TextInput label="Title" placeholder="Title" {...form.getInputProps('monthlyfee')} />
     
        </Stepper.Step>


        <Stepper.Completed>
      
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Box>
    
  );
}

export default Videocontent;