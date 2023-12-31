import React from "react";
import { MantineProvider, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import {
  Stepper,
  Group,
  TextInput,
  PasswordInput,
  NumberInput,
  Code,
  Select,
  Radio,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Box,
  Text,
  Heading,
  HStack,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Show, Hide } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";

const Addpaper = ({ onStudyPackAdd }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [coursesdata, setCoursesData] = useState(null);

  const [active, setActive] = useState(0);
  const location = useLocation();
  let id = location.pathname.split("/").pop();
  const [newPaper, setNewPaper] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("1");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const form = useForm({
    initialValues: {
      subject: "",
      title: "",
      description: "",
      thumbnail: "",
      price: "",
      access_period: "",
      type: "NORMAL",

      subject_area_1: "",
      subject_area_2: "",
      subject_area_3: "",
      subject_area_4: "",

      course_id: id,
      years: "",
      days: "",
      months: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          title:
            values.title.trim().length < 1
              ? "Title is Required"
              : values.title.length > 25
              ? "Title Too Long"
              : null,

          description:
            values.description.trim().length < 1
              ? "Description is Required"
              : values.description.length > 100
              ? "Description Must be less than 100 Characters"
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
            values.subject.trim().length < 1 ? "Subject is Required" : null,

          // thumbnail:
          // values.thumbnail.trim().length < 1
          //   ?  'Thumbnail is Required'
          //   : null,

          subject_area_1:
            values.subject_area_1.trim().length < 1
              ? "At least 1 subject area is Required"
              : null,
        };
      }

      return {
        price:
          values.price.length < 1
            ? "Price is Required"
            : values.price >= 50000
            ? "Price must be less than 50000"
            : null,

        // days: values.days.length < 1
        // ? "Day is Required"
        // : parseInt(values.days) >= 365
        // ? "Days must be less than 366 days"
        // : null,

        // months: values.months.length < 1
        // ? "Month is Required"
        // : parseInt(values.months) >= 12
        // ? "Month must be less than 12 months"
        // : null,

        //       years: values.years.length < 1
        //       ? "Year is Required"
        //       : parseInt(values.years) >= 3
        //       ? "Year must be less than 3 years"
        //       : null,
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

  useEffect(() => {
    // Check if there is a success message in localStorage
    const successMessage = localStorage.getItem("studyPackAddedSuccess");

    if (successMessage) {
      // Display the success message as a toast
      toast({
        title: "Study Pack Added",
        description: successMessage,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // Remove the success message from localStorage
      localStorage.removeItem("studyPackAddedSuccess");
    }
  }, []);

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
            // days: form.values.days,
            // months: form.values.months,
            // years: form.values.years,
          },
        };

        console.log(updatedFormValues);

        // Step 1: Create a new entry in the studypack table
        const response = await axiosPrivate.post(
          "/tutor/studypack",
          updatedFormValues
        );
        const studypackId = response.data.id; // Assuming the response contains the created studypack ID

        console.log("Studypack created with ID:", studypackId);

        // Step 2: Update the course entry by adding the studypack ID to the studypack array
        const courseId = id;
        const courseUpdateData = {
          studypack_ids: [studypackId],
        };

        const courseResponse = await axiosPrivate.put(
          `/tutor/course/studypack/${courseId}`,
          courseUpdateData
        );

        console.log("Course updated with new studypack ID:", studypackId);

        // Step 3: Get the existing price value from the studypack entry
        const existingStudypack = await axiosPrivate.get(
          `/tutor/studypack/${studypackId}`
        );
        const existingPrice = existingStudypack.data.price;

        // Step 4: Set default content_ids up to week 4 while preserving the existing price
        const defaultContentIds = [
          // Repeat the above structure for additional weeks if needed
        ];

        const studypackUpdateData = {
          content_ids: defaultContentIds,
          price: existingPrice, // Preserve the existing price
        };

        const studypackUpdateResponse = await axiosPrivate.put(
          `/tutor/studypack/${studypackId}`,
          studypackUpdateData
        );

        // console.log('Studypack content_ids updated with default values:', studypackUpdateResponse);
        toast({
          title: "Studypack Added",
          description: "New Studypack has been successfully Added.",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => {
            // Reload the page after the toast is manually closed
            window.location.reload();
          },
        });
        onClose();

        // localStorage.setItem('formSubmitted', 'true');
        // onStudyPackAdd(studypackId);

        // window.location.reload();
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <>
      <Button
        fontSize="15px"
        width={{ base: 400, xl: 700 }}
        height="35px"
        bg="white"
        border="2px dotted black"
        onClick={onOpen}
      >
        +Add Studypack
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={1}>
            <Box width="100%" p={1}>
              <form className="container" onSubmit={handleSubmit}>
                <Box bg="white" width="90%" ml="5%" p={5}>
                  <Stepper active={active} breakpoint="sm">
                    <Stepper.Step description="Basic Details">
                      <TextInput
                        label="Title"
                        placeholder="Title"
                        {...form.getInputProps("title")}
                        h="50px"
                        mb="30px"
                        mt="10px"
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
                            height: "120px",
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

                    <Stepper.Step description="Subject Details">
                      <TextInput
                        label="Subject"
                        placeholder="Subject"
                        {...form.getInputProps("subject")}
                        h="50px"
                        mb="10px"
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

                      <HStack spacing="50px">
                        <TextInput
                          label="Subject Areas"
                          placeholder="Subject area"
                          {...form.getInputProps("subject_area_1")}
                          h="50px"
                          mb="10px"
                          styles={{
                            input: {
                              // Styles for the input element

                              color: "black",
                              borderRadius: "8px",
                              padding: "10px",
                              height: "30px",
                              width: "200px",
                            },
                            label: {
                              // Styles for the label element
                              fontSize: "16px",
                              fontWeight: "bold",
                              marginBottom: "5px",
                            },
                          }}
                        />

                        <TextInput
                          label=""
                          placeholder="Subject area"
                          {...form.getInputProps("subject_area_2")}
                          h="50px"
                          mb="10px"
                          mt="60px"
                          styles={{
                            input: {
                              // Styles for the input element

                              color: "black",
                              borderRadius: "8px",
                              padding: "10px",
                              height: "30px",
                              width: "200px",
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

                      <HStack spacing="50px">
                        <TextInput
                          label=""
                          placeholder="Subject area"
                          {...form.getInputProps("subject_area_3")}
                          h="50px"
                          mb="10px"
                          styles={{
                            input: {
                              // Styles for the input element

                              color: "black",
                              borderRadius: "8px",
                              padding: "10px",
                              height: "30px",
                              width: "200px",
                            },
                            label: {
                              // Styles for the label element
                              fontSize: "16px",
                              fontWeight: "bold",
                              marginBottom: "5px",
                            },
                          }}
                        />

                        <TextInput
                          label=""
                          placeholder="Subject Area"
                          {...form.getInputProps("subject_area_4")}
                          h="50px"
                          mb="10px"
                          styles={{
                            input: {
                              // Styles for the input element

                              color: "black",
                              borderRadius: "8px",
                              padding: "10px",
                              height: "30px",
                              width: "200px",
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

                      {/* <TextInput label="Thumbnail" placeholder="Thumbnail" {...form.getInputProps('thumbnail')} h='50px' mb='60px'
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
           
            }} /> */}
                    </Stepper.Step>

                    <Stepper.Step description="Price Details">
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

                      {/* <HStack spacing='40px' mt='20px'> */}
                      {/* 
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
              /> */}

                      {/* <NumberInput
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
              /> */}

                      {/* 
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

</HStack> */}
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
                          {/* <UnorderedList>
                <ListItem>
                  <HStack spacing="100px">
                  <Box width="150px">
                      <Text fontSize='13px'>Title:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey' fontSize='13px'>
                      {form.values.title}
                      </Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text fontSize='13px'>Description:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey' fontSize='13px'> {form.values.description}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text fontSize='13px'>Subject:</Text>
                    </Box>
                    <Box width="200px">
                      <Text  color='grey'fontSize='13px'> {form.values.subject}</Text>
                    </Box>
                  </HStack>
                  </ListItem>

                  <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text fontSize='13px'>Subject Areas:</Text>
                    </Box>
                    <Box width="200px">
                    <Text color="grey" fontSize='13px'>
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
                      <Text fontSize='13px'>Price:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey' fontSize='13px'> {form.values.price}</Text>
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

                          {/* <ListItem>
                  <HStack spacing="100px" mt='10px'>
                  <Box width="150px">
                      <Text fontSize='13px'>Access Period:</Text>
                    </Box>
                    <Box width="200px">
                      <Text color='grey' fontSize='13px'>Days:{form.values.days}    Months:{form.values.months}    Years:{form.values.years}</Text>
                 
                    </Box>
                  </HStack>
                  </ListItem>

                



             
      </UnorderedList>  */}
                        </Box>
                      </Box>
                    </Stepper.Completed>
                  </Stepper>

                  <Group position="right" mt="xl">
                    {active !== 0 && (
                      <Button
                        variant="default"
                        onClick={prevStep}
                        fontSize="12px"
                        colorScheme="blue"
                      >
                        Back
                      </Button>
                    )}
                    {active !== 3 && (
                      <Button
                        onClick={nextStep}
                        fontSize="12px"
                        colorScheme="blue"
                      >
                        Next step
                      </Button>
                    )}
                    {active === 3 && (
                      <Button type="submit" fontSize="12px" colorScheme="blue">
                        Submit
                      </Button>
                    )}
                  </Group>
                </Box>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addpaper;
