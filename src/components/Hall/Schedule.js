import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Schedule = ({ isOpen, onClose, onSchedule }) => {
  const toast = useToast(); // Initialize useToast
  const axiosPrivate = useAxiosPrivate();
  const [hallOptions, setHallOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  // Fetch hall names and IDs from the backend
  useEffect(() => {
    const fetchHallOptions = async () => {
      try {
        const response = await axiosPrivate.get("/staff/hall");
        setHallOptions(response.data); // Assuming the data is an array of objects with hall_id and hall_name
      } catch (error) {
        console.error("Error fetching hall options:", error);
      }
    };

    fetchHallOptions();
  }, [toast, axiosPrivate]);

  // Fetch hall names and IDs from the backend
  useEffect(() => {
    const fetchCourseOptions = async () => {
      try {
        const response = await axiosPrivate.get("/staff/class");
        setCourseOptions(response.data); // Assuming the data is an array of objects with hall_id and hall_name
      } catch (error) {
        console.error("Error fetching hall options:", error);
      }
    };

    fetchCourseOptions();
  }, [toast, axiosPrivate]);

 const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  setSubmitting(true);
  try {
    await axiosPrivate.post("/staff/schedule", values);
    toast({
      title: "Schedule created",
      description: "Schedule is successfully created.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    onSchedule(values);
    onClose();
    resetForm();
  } catch (error) {
   
    toast({
      title: "Error creating schedule",
      description: "An error occurred while creating the schedule.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }
  setSubmitting(false);
};

  const validationSchema = Yup.object().shape({
    hallId: Yup.string().required("Hall ID is required"),
    day: Yup.string().required("Day is required"),
    date: Yup.string().required("Date is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
    type: Yup.string().required("Type is required"),
    courseId: Yup.string().required("Course ID is required"),
  });

  const modalSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule Hall</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            hallId: "",
            day: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "",
            courseId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <FormControl>
                  <FormLabel>Hall</FormLabel>
                  <Select
                    value={values.hallId}
                    onChange={handleChange("hallId")}
                    style={{ maxWidth: "60vh", width: "100%" }}
                  >
                    <option value="" disabled>
                      Select a hall
                    </option>
                    {hallOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>

                  {touched.hallId && errors.hallId && (
                    <div style={{ color: "red" }}>{errors.hallId}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Day</FormLabel>
                  <Select value={values.day} onChange={handleChange("day")}>
                  <option value="" disabled> Select a Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Select>
                  {touched.day && errors.day && (
                    <div style={{ color: "red" }}>{errors.day}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={values.date}
                    onChange={handleChange("date")}
                  />
                  {touched.date && errors.date && (
                    <div style={{ color: "red" }}>{errors.date}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    value={values.startTime}
                    placeholder="Enter in the format 00:00"
                    onChange={handleChange("startTime")}
                  />
                  {touched.startTime && errors.startTime && (
                    <div style={{ color: "red" }}>{errors.startTime}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    value={values.endTime}
                    placeholder="Enter in the format 00:00"
                    onChange={handleChange("endTime")}
                  />
                  {touched.endTime && errors.endTime && (
                    <div style={{ color: "red" }}>{errors.endTime}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange("type")}
                    placeholder="Select a type"
                  >
                    <option value="RECURRING">RECURRING</option>
                    <option value="ONE_TIM">ONE_TIME</option>
                  </Select>
                  {touched.type && errors.type && (
                    <div style={{ color: "red" }}>{errors.type}</div>
                  )}
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Course</FormLabel>
                  <Select
                    value={values.courseId}
                    onChange={handleChange("courseId")}
                  >
                    <option value="" disabled>
                      Select a course
                    </option>
                    {courseOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </Select>
                  {touched.courseId && errors.courseId && (
                    <div style={{ color: "red" }}>{errors.courseId}</div>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  size={buttonSize}
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                  onClick={handleSubmit}
                >
                  Schedule
                </Button>
                <Button size={buttonSize} onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default Schedule;