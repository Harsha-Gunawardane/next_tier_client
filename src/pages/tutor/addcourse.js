import React from "react";
import { MantineProvider, Textarea } from "@mantine/core";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  NumberInput,
  Select,
  Radio,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Box, Text, Heading, HStack,UnorderedList,ListItem } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { TimeInput } from "@mantine/dates";


import { DateInput } from "@mantine/dates";
 
import { CheckCircleIcon } from '@chakra-ui/icons'

const Addcourse = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [active, setActive] = useState(0);

  const validateGrade = (inputTitle) => {
    // Define the regex pattern for 4 digits and 2 letters
    const regexPattern = /^\d{4}\s(?:A\/L|O\/L)$/;

    // Test the inputTitle against the regex pattern
    return regexPattern.test(inputTitle);
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      subject: "",
      medium: "",
      grade: "",
      thumbnail: "",
      day: "",
      end_time: "",
      start_time: "",
      monthly_fee: "",
      type: "",
      start_date: "",
      // content_ids: [
      //   {
      //     tute_id: [],
      //     video_id: [],
      //   },
      // ],
 
    },

    validate: (values) => {
      if (active === 0) {
        return {
          type: values.type.trim().length < 1 ? "Title is Required" : null,

          description:
            values.description.trim().length < 1
              ? "Description is Required"
              : values.description.length > 800
              ? "Description must be less than 800 characters"
              : null,

          subject:
            values.subject.trim().length < 1
              ? "Subject is Required"
              : values.subject.length > 50
              ? "Subject cannot have more than 50 characters"
              : null,
        };
      }

      if (active === 1) {
        return {
          grade:
            values.grade.trim().length < 1
              ? "grade is Required"
              : !validateGrade(values.grade)
              ? "Grade must be 4 digits followed by 2 letters"
              : null,

          
    

          medium: values.medium.trim().length < 1 ? "Medium is Required" : null,
        };
      }

      return {
        start_date:
        values.day.length < 1
          ? "Start Date is Required"
          : new Date(values.day) < new Date().setHours(0, 0, 0, 0)
          ? "Start Date must be greater than today's date"
          : null,

        day: values.day.trim().length < 1 ? "Day is Required" : null,

        start_time:
          values.start_time.length < 1 ? "Start time is required" : null,

        end_time: values.end_time.length < 1 ? "End time is Required" : null,

        monthly_fee:
          values.monthly_fee.length < 1 ? "Monthlyfee is Required" :  values.monthly_fee < 0 || values.monthly_fee > 1000000
          ? "Monthly fee must be between 0 and 1,000,000":null,
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

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [generatedTitle, setGeneratedTitle] = useState("");

  // Function to update the title based on grade, type, and subject
  const updateTitle = () => {
    const { grade, type, subject } = form.values;

    // Logic to create the title based on the selected values
    const title = `${subject} ${grade} ${type}`;

    // Update the state with the generated title
    setGeneratedTitle(title);
  };




  

  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleThumbnailChange = (files) => {
    setThumbnailFile(files[0]);
    
  };




  
  const [startDate, setStartDate] = useState(new Date()); // Initialize with the current date

  // Function to handle changes in the DateInput component
  const handleStartDateChange = (date) => {
    setStartDate(date); // Update the startDate state with the selected date
  };






  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();

    if (!form.validate().hasErrors) {
      try {
        // console.log(form.values);
        // console.log(thumbnailFile);

        const { grade, type, subject,thumbnail } = form.values;
        const title = `${subject} ${grade} ${type}`;
        
        // Create a new object containing all form values and the schedule
        const updatedFormValues = {
          ...form.values,
          title: title,
          start_date: startDate.toISOString(),
          // thumbnail: thumbnailFile.name,
          schedule: {
            day: form.values.day,
            start_time: form.values.start_time,
            end_time: form.values.end_time,
          }, // Convert the schedule object into an array to match the expected format
        };

        // console.log(updatedFormValues);

        // const defaultContentIds = [
        //   {
        //     tute_id: [],
        //     video_id: [],
        //   }
        // ];


        const finalFormValues = {
          ...updatedFormValues,
          // content_ids: form.values.content_ids,
        };

        const response = await axiosPrivate.post(
          "/tutor/course",
          finalFormValues
        );

        console.log("Form data submitted successfully!");
        const newCourseId = response.data.id;

        navigate("/tutor/courses/details/" + newCourseId);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <Box width="80%" p={10} ml="70px">
      <Heading fontSize="30px" ml="350px" mb="40px">
        Course Registration
      </Heading>
      <form className="container" onSubmit={handleSubmit}>
        <Box bg="white" width="90%" ml="5%" p={5}>
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step label="First step" description="Basic Details">
              <TextInput
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

              <Textarea
                label="Description"
                placeholder="Description"
                {...form.getInputProps("description")}
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "160px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

              <Select
                label="Course Type"
                placeholder="course type"
                {...form.getInputProps("type")}
                data={[
                  { value: "Theory", label: "Theory" },
                  { value: "Revision", label: "Revision" },
                  { value: "Paper", label: "Paper" },
                ]}
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />
            </Stepper.Step>

            <Stepper.Step
              label="Second step"
              description="Personal information"
            >
              <TextInput
                {...form.getInputProps("grade")}
                defaultValue={18}
                placeholder="grade (2024 A/L)"
                label="Grade"
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

               <FileInput
                {...form.getInputProps("thumbnail")}
                defaultValue={18}
                placeholder="Thumbnail"
                label="Thumbnail "
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              /> 

              {/* <FileInput
                label="Thumbnail"
                // accept="image/*" // Specify the accepted file types (here, images)
                onChange={handleThumbnailChange}
                {...form.getInputProps("thumbnail")} // Set the selected thumbnail file to state
                styles={{
                  input: {
                    // Styles for the input element
                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              /> */}

              <Radio.Group
                mt="10px"
                {...form.getInputProps("medium")}
                name="favoriteFramework"
                label="Medium"
                withAsterisk
                styles={{
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              >
                <Group mt="xs">
                  <Radio value="Sinhala" label="Sinhala" />
                  <Radio value="English" label="English" />
                </Group>
              </Radio.Group>

              {/* <TextInput label="Hall ID" placeholder="Hall ID" {...form.getInputProps('hall_id')} 
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
           
            }} />  */}
            </Stepper.Step>

            <Stepper.Step label="Final step" description="Social media">
              <NumberInput
                {...form.getInputProps("monthly_fee")}
                defaultValue={18}
                placeholder="Monthly Fee"
                label="Monthly Fee"
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />
    <DateInput
      {...form.getInputProps("start_date")}
      label="Start date"
      placeholder="Start Date"
      value={startDate} // Set the value of DateInput to startDate
      onChange={handleStartDateChange} // Handle changes to update startDate
      styles={{
        // Styles for the input element
        input: {
          color: "black",
          borderRadius: "8px",
          padding: "10px",
          height: "60px",
        },
        label: {
          // Styles for the label element
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "5px",
        },
      }}
    />

              <Select
                label="Day"
                placeholder="Day"
                {...form.getInputProps("day")}
                data={[
                  { value: "Monday", label: "Monday" },
                  { value: "Tuesday", label: "Tuesday" },
                  { value: "Wednesday", label: "Wednesday" },
                  { value: "Thursday", label: "Thursday" },
                  { value: "Friday", label: "Friday" },
                  { value: "Saturday", label: "Saturday" },
                  { value: "Sunday", label: "Sunday" },
                ]}
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

              <TimeInput
                {...form.getInputProps("start_time")}
                label="Start Time"
                withAsterisk
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

              <TimeInput
                {...form.getInputProps("end_time")}
                label="End Time"
                withAsterisk
                description="Add 1 for A.M. and 2 for P.M."
                styles={{
                  input: {
                    // Styles for the input element

                    color: "black",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "60px",
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />

              {/* <TextInput label="Start Date" placeholder="Start Date" {...form.getInputProps('startday')} 
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
           
            }} /> */}
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
                        {" "}
                        {form.values.subject} {form.values.grade}{" "}
                        {form.values.type}
                      </Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Description:</Text>
                    </Box>
                    <Box width="500px">
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
                      <Text>Grade:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey' > {form.values.grade}</Text>
                    </Box>
                  </HStack>
                  </ListItem>


                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Medium:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'> {form.values.medium}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Monthly fee:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'> {form.values.monthly_fee}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>

                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Day</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey' > {form.values.day}</Text>
                    </Box>
                  </HStack>
                  </ListItem>


                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>Start Time:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey'  > {form.values.start_time}</Text>
                    </Box>
                  </HStack>
                  </ListItem>



                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text>End Time:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey'> {form.values.end_time}</Text>
                    </Box>
                  </HStack>
                  </ListItem>


                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
        <Box width="150px">
          <Text>Start Date:</Text>
        </Box>
        <Box width="200px">
          {/* Format and display the start_date */}
          <Text color='grey'> {startDate.toLocaleDateString()}</Text>
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
            {active === 3 && <Button type="submit">Submit</Button>}
          </Group>
        </Box>
      </form>
    </Box>
  );
};

export default Addcourse;