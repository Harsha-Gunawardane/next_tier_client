import React from "react";
import { MantineProvider, Textarea } from "@mantine/core";
import { useState, useEffect } from "react";
import {
  Stepper,
  Button,
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Addcoursepack = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [coursesdata, setCoursesData] = useState(null);

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      subject: "",
      title: "",
      description: "",
      files: "",
      price: "",
      medium:"",
      access_period: "",
      type: "PAID",
      // medium: "",

      subject_area_1: "",
      subject_area_2: "",
      subject_area_3: "",
      subject_area_4: "",

      course_id: "",
      years: "",
      days: "",
      months: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          title:
            values.title.trim().length < 1
              ? "Course Type is Required"
              : values.title.length > 25
              ? "Title must be less than 100 characters "
              : null,

          description:
            values.description.trim().length < 1
              ? "Language is Required"
              : values.description.length > 1000
              ? "Description must be less than 1000 characters"
              : null,

              medium:
              values.medium.trim().length < 1
                ? "medium is Required"
                : null,

          course_id:
            values.course_id.trim().length < 1
              ? "Course Type is Required"
              : null,

              // medium: values.medium.trim().length < 1 ? "Medium is Required" : null,
        };
      }

      if (active === 1) {
        return {
          subject:
            values.subject.trim().length < 1 ? "Subject is Required" : null,
        };
      }

      return {
        price:
          values.price.length < 1
            ? "Price is Required"
            : values.price >= 50000
            ? "Price must be less than 50000"
            : null,

        // thumbnail:
        //   values.thumbnail.trim().length < 1 ? "Course Type is Required" : null,

        days:
          values.days.length < 1
            ? "Day is Required"
            : parseInt(values.days) >= 2000
            ? "Days must be less than 2000 days"
            : null,

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
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);

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

        const access_period = [form.values.days];

        const updatedFormValues = {
          ...form.values,
          access_period,
          subject_areas: subjectAreas.filter((area) => area.trim().length > 0),
          // Remove the individual subject area fields from the updatedFormValues object
          subject_area_1: undefined,
          subject_area_2: undefined,
          subject_area_3: undefined,
          subject_area_4: undefined,
        };

        console.log(updatedFormValues);

        const response = await axiosPrivate.post("/tutor/studypack", updatedFormValues,{
          headers: { "Content-Type": "multipart/form-data" },
        }
        );

        console.log("Form data submitted successfully!");
        const newCourseId = response.data.id;

        navigate("/tutor/courses/studypackdetails/" + newCourseId);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  if (coursesdata === null) {
    return <div>Loading...</div>;
  }

  return (
    <Box width="100%" p={10}>
      <form className="container" onSubmit={handleSubmit}>
        <Box bg="white" width="90%" ml="5%" p={5}>
          <Heading
            ml={{ base: 200, xl: 350 }}
            fontSize="25px"
            mb="30px"
            colorScheme="blue"
          >
            Study Pack Registration
          </Heading>
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step label="First step" description="Profile settings">
              <TextInput
                label="Title"
                placeholder="Title"
                {...form.getInputProps("title")}
                h="50px"
                mb="60px"
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
                label="Course"
                mt="10px"
                placeholder="course"
                {...form.getInputProps("course_id")}
                // Update data array to include the course ID as the value property
                data={coursesdata.map((course) => ({
                  value: course.id,
                  label: course.title,
                }))}
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

            </Stepper.Step>

            <Stepper.Step
              label="Second step"
              description="Personal information"
            >
              <TextInput
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
                h="50px"
                mb="60px"
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

              <HStack spacing="50px">
                <TextInput
                  label="Subject Areas"
                  placeholder="Subject area"
                  {...form.getInputProps("subject_area_1")}
                  h="50px"
                  mb="60px"
                  styles={{
                    input: {
                      // Styles for the input element

                      color: "black",
                      borderRadius: "8px",
                      padding: "10px",
                      height: "60px",
                      width: "400px",
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
                  mb="60px"
                  mt="60px"
                  styles={{
                    input: {
                      // Styles for the input element

                      color: "black",
                      borderRadius: "8px",
                      padding: "10px",
                      height: "60px",
                      width: "400px",
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
                  mb="60px"
                  styles={{
                    input: {
                      // Styles for the input element

                      color: "black",
                      borderRadius: "8px",
                      padding: "10px",
                      height: "60px",
                      width: "400px",
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
                  mb="60px"
                  styles={{
                    input: {
                      // Styles for the input element

                      color: "black",
                      borderRadius: "8px",
                      padding: "10px",
                      height: "60px",
                      width: "400px",
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

            <Stepper.Step label="Final step" description="Final Step">
              <FileInput
                label="Thumbnail"
                placeholder="Thumbnail"
                {...form.getInputProps("files")}
                h="50px"
                mb="60px"
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
                    height: "60px",
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
                    height: "60px",
                    width:'100%'
                  },
                  label: {
                    // Styles for the label element
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  },
                }}
              />*/}

              <NumberInput
                {...form.getInputProps("days")}
                defaultValue={18}
                placeholder="Days"
                label="Access Period"
                mt="30px"
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
                          <Text color="grey">{form.values.title}</Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Description:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey"> {form.values.description}</Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Subject:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey"> {form.values.subject}</Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Medium:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey"> {form.values.medium}</Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Subject Areas:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey">
                            {form.values.subject_area_1}
                            {form.values.subject_area_2 &&
                              `, ${form.values.subject_area_2}`}
                            {form.values.subject_area_3 &&
                              `, ${form.values.subject_area_3}`}
                            {form.values.subject_area_4 &&
                              `, ${form.values.subject_area_4}`}
                          </Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Price:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey"> {form.values.price}</Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Course:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey">
                            {
                              coursesdata.find(
                                (course) => course.id === form.values.course_id
                              )?.title
                            }
                          </Text>
                        </Box>
                      </HStack>
                    </ListItem>

                    <ListItem>
                      <HStack spacing="100px" mt="10px">
                        <Box width="150px">
                          <Text>Access Period:</Text>
                        </Box>
                        <Box width="200px">
                          <Text color="grey">Days:{form.values.days} </Text>
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

export default Addcoursepack;
