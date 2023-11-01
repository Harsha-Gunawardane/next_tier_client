import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Stack,
  useBreakpointValue,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ButtonStyles = {
  backgroundColor: "blue.400",
  color: "white",
  borderRadius: "5px",
  _hover: {
    backgroundColor: "blue.300",
  },
};

const validationSchema = Yup.object().shape({
  tutor_id: Yup.string().required("Teacher Name is required"),
  title: Yup.string().required( "Teaching Medium is required"),
  medium: Yup.array().min(1, "Teaching Medium is required"),
  subject: Yup.string().required("Subject is required"),
  grade: Yup.string().required("Grade is required"),
  price: Yup.string()
    .required('Monthly fee is required')
    .test('is-integer', 'Monthly fee must be an integer', (value) => {
      if (value === undefined || value === null || value.trim() === '') {
        return true; 
      }
      return /^[0-9]+$/.test(value);
    }),
  date: Yup.string().required("Class Starting Date is required"),
  hallId: Yup.string().required("Hall is required"),
  schedule: Yup.string().required("Class Schedule is required"),
});

function AddClass({ onAddClass }) {
  const [tutorData, setTutorData] = useState([]);
  const [hallData, setHallData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      tutor_id: "",
      title: "",
      medium: "", 
      subject: "",
      grade: "",
      price: "",
      date: "",
      hallId: "",
      schedule: "",
      details: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axiosPrivate.post("/staff/class", values);
        onAddClass(response.data);
        const classTitle = values.title;
        toast({
          title: "Success",
          description:  `New Class "${classTitle}" Registered Successfully!`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        formik.resetForm();
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Class not added. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setIsFormSubmitted(true);
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/tutor");
        setTutorData(response.data);
      } catch (error) {
        console.error("Error fetching tutor details:", error);
        toast({
          title: "Error",
          description: "Error fetching tutor details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchTutorDetails();
  }, [toast, axiosPrivate]);

  useEffect(() => {
    const fetchHallDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/hall");
        setHallData(response.data);
      } catch (error) {
        console.error("Error fetching hall details:", error);
        toast({
          title: "Error",
          description: "Error fetching hall details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchHallDetails();
  }, [toast, axiosPrivate]);

  const modalSize = useBreakpointValue({ base: "xs", sm: "md", md: "lg" });

  return (
    <>
      <Button size="md" sx={ButtonStyles} my="4" onClick={onOpen}>
        Add a New Class
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} centerContent size={modalSize}>
        <ModalOverlay />
        <ModalContent style={{ width: "100%", maxWidth: "800px" }}>
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Box
                {...(isFormSubmitted && (
                  <Alert status="success" mb={4}>
                    <AlertIcon />
                    Form submitted successfully!
                  </Alert>
                ))}
              >
                <Box
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  p="4"
                >
                  <Stack direction={["column", "row"]} spacing="20px">
                    <Box flex="1">
                      <FormControl mb="4">
                        <FormLabel>Teacher Name</FormLabel>
                        <Select
                          value={formik.values.tutor_id}
                          onChange={formik.handleChange("tutor_id")}
                          onBlur={formik.handleBlur("tutor_id")}
                          style={{ maxWidth: "50vh", width: "100%" }}
                        >
                          <option value="" disabled>
                            Select a tutor
                          </option>
                          {tutorData.map((option) => (
                            <option
                              key={option.tutor_id}
                              value={option.tutor_id}
                            >
                              {option.email}
                            </option>
                          ))}
                        </Select>
                        {formik.touched.tutor_id && formik.errors.tutor_id ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.tutor_id}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Title</FormLabel>
                        <Input
                          placeholder="Ex:- Physics 2024 A/L Theory"
                          value={formik.values.title}
                          onChange={formik.handleChange("title")}
                          onBlur={formik.handleBlur("title")}
                        />
                        {formik.touched.title && formik.errors.title ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.title}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="8">
                        <FormLabel>Medium</FormLabel>
                        <CheckboxGroup
                          value={formik.values.medium}
                          onChange={formik.handleChange("medium")}
                          onBlur={formik.handleBlur("medium")}
                          colorScheme="blue"
                        >
                          <Stack spacing={[1, 5]} direction={["column", "row"]}>
                            <Checkbox value="sinhala">Sinhala</Checkbox>
                            <Checkbox value="english">English</Checkbox>
                            <Checkbox value="tamil">Tamil</Checkbox>
                          </Stack>
                        </CheckboxGroup>
    
                        {formik.touched.medium && formik.errors.medium ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.medium}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Subject</FormLabel>
                        <Input
                        placeholder="Ex:- Physics"
                          value={formik.values.subject}
                          onChange={formik.handleChange("subject")}
                          onBlur={formik.handleBlur("subject")}
                        />
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Grade</FormLabel>
                        <Input
                        placeholder="Ex:- 2024 A/L"
                          value={formik.values.grade}
                          onChange={formik.handleChange("grade")}
                          onBlur={formik.handleBlur("grade")}
                        />
                        {formik.touched.grade && formik.errors.grade ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.grade}
                          </div>
                        ) : null}
                      </FormControl>
                    </Box>

                    <Box flex="1">
                      <FormControl mb="4">
                        <FormLabel>Price</FormLabel>
                        <Input
                          value={formik.values.price}
                          onChange={formik.handleChange("price")}
                          onBlur={formik.handleBlur("price")}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.price}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Start Date</FormLabel>
                        <Input
                          type="date"
                          value={formik.values.date}
                          onChange={formik.handleChange("date")}
                          onBlur={formik.handleBlur("date")}
                        />
                        {formik.touched.date && formik.errors.date ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.date}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Hall No</FormLabel>
                        <Select
                          value={formik.values.hallId}
                          onChange={formik.handleChange("hallId")}
                          onBlur={formik.handleBlur("hallId")}
                          style={{ maxWidth: "50vh", width: "100%" }}
                        >
                          <option value="" disabled>
                            Select a hall
                          </option>
                          {hallData.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Select>
                        {formik.touched.hallId && formik.errors.hallId ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.hallId}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Schedule</FormLabel>
                        <Input
                          value={formik.values.schedule}
                          onChange={formik.handleChange("schedule")}
                          onBlur={formik.handleBlur("schedule")}
                        />
                        {formik.touched.schedule && formik.errors.schedule ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.schedule}
                          </div>
                        ) : null}
                      </FormControl>
                      <FormControl mb="4">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          placeholder="Provide Additional Details"
                          value={formik.values.details}
                          onChange={formik.handleChange("details")}
                          onBlur={formik.handleBlur("details")}
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </Box>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button
                    ml="2"
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    Clear
                  </Button>
                  <Button ml="2" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddClass;

