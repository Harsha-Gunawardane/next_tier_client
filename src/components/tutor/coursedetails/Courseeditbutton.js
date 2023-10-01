import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  RadioGroup,
  Stack,
  Radio
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
 
  
} from "@chakra-ui/react";
import { TimeInput } from "@mantine/dates";
import { Select } from "@chakra-ui/react";
import ReactTimePicker from "react-time-picker";

const Courseeditbutton = () => {
  const axiosPrivate = useAxiosPrivate();
  const { courseid } = useParams();
  const [coursesdata, setCoursesData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [monthly_fee, setMonthlyFee] = useState("");
  const [thumbnail, setThumbnail] = useState("");
   const [visibility, setVisibility] = useState("");
  // const [subject, setSubject] = useState("");
  const [medium, setMedium] = useState("");
  // const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [schedule, setSchedule] = useState("");
  const [grade, setGrade] = useState("");
  const [validation, valchange] = useState(false);
  const toast = useToast(); 

  // const generateTitle = () => {
  //   return `${subject} ${grade} ${type}`;
  // };

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course/${courseid}`, {
          signal: controller.signal,
        });
        const courseData = response.data;

        // Set the initial values for title, description, and monthly_fee
        setTitle(courseData.title);
        setDescription(courseData.description);
        setMonthlyFee(courseData.monthly_fee.toString());
        setThumbnail(courseData.thumbnail); // Convert to string if necessary
       
        setMedium(courseData.medium);
        setVisibility(courseData.visibility);
       
       
        setSchedule(courseData.schedule);

        if (courseData.schedule.length > 0) {
          const initialSchedule = courseData.schedule[0];
          setDay(initialSchedule.day);
          setStartTime(initialSchedule.start_time);
          setEndTime(initialSchedule.end_time);
        }


      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate, courseid]);


  const [val, setValidation] = useState(false);

  const handleChange = (value) => {
    // Only set the monthly_fee if the value is a valid number
    if (value === null || !isNaN(value)) {
      setMonthlyFee(value);
      setValidation(false);
    } else {
      // If the value is not a valid number, mark it as invalid
      setValidation(true);
    }
  };

  //Grade validation
  const [isGradeValid, setIsGradeValid] = useState(true);

  const validateGrade = () => {
    const gradeRegex = /^(202[3-9]|20[3-9][0-9]|2100)\s(A\/L|O\/L)$/;
    setIsGradeValid(gradeRegex.test(grade));
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
    setIsGradeValid(true); // Reset the validation on each change
  };


  const [isFormSubmitted, setIsFormSubmitted] = useState(false);



  
  const handlesubmit = (e) => {
    e.preventDefault();
  
    // Check all the validations before submitting the form
    const isFormValid =
      title.trim().length !== 0 &&
      description.trim().length !== 0 &&
      description.length <= 1000 &&
      monthly_fee.trim().length !== 0 &&
      !isNaN(monthly_fee) &&
      parseFloat(monthly_fee) >= 0 &&
      thumbnail.trim().length !== 0 &&
      // subject.trim().length !== 0 &&
      isGradeValid;
  
    if (!isFormValid) {
      return;
    }
  
    const coursedata = {
      id: courseid,
      title,
      description,
      monthly_fee,
      thumbnail,
      medium,
      visibility,
      schedule: [
        {
          day: day,
          start_time: startTime,
          end_time: endTime,
        },
        // Add other schedule items if applicable
      ],
    };
  
    axiosPrivate
      .put(`/tutor/course/${courseid}`, coursedata)
      .then((response) => {
        localStorage.setItem("courseUpdated", "true");
        onClose();
        // Reload the window
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error Updating Course:', error);
      });
  };

  // Check if a study pack was removed and show the toast accordingly
  const isStudyPackRemoved = localStorage.getItem("courseUpdated");
  if (isStudyPackRemoved) {
    localStorage.removeItem("courseUpdated");
    toast({
      title: "Course Details Updated",
      description: "The Course details has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };



  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button fontSize="12px" colorScheme="blue" height="30px" onClick={onOpen}>
        Edit
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handlesubmit}>
            <ModalHeader>Update Course Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired isInvalid={title.trim().length === 0}>
                <FormLabel fontSize="15px">Title</FormLabel>
                <Input
                  fontSize="15px"
                  value={title}
                  height="40px"
                  ref={initialRef}
                  placeholder="Title"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setTitle(e.target.value)}
                    readOnly 
                />
                <FormErrorMessage>Title is required</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={
                  description.trim().length === 0 || description.length > 1000
                }
              >
                <FormLabel fontSize="15px">Description</FormLabel>
                <Textarea
                  fontSize="15px"
                  value={description}
                  height="120px"
                  ref={initialRef}
                  placeholder="Description"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormErrorMessage>
                {description.trim().length === 0
          ? "Description is required"
          : description.length > 1000
          ? "Description cannot exceed 1000 characters"
          : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={
                  monthly_fee.trim().length === 0 || parseFloat(monthly_fee) < 0 || parseFloat(monthly_fee) > 50000
                }
              >
                <FormLabel fontSize="15px">Monthly Fee</FormLabel>
                <NumberInput
                  value={monthly_fee}
                  onChange={handleChange}
                  precision={2}
                >
                  <NumberInputField
                    fontSize="15px"
                    height="40px"
                    placeholder="Monthly Fee"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Monthly Fee is Required</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={thumbnail.trim().length === 0}
              >
                <FormLabel fontSize="15px">Thumbnail</FormLabel>
                <Input
                  fontSize="15px"
                  value={thumbnail}
                  height="40px"
                  ref={initialRef}
                  placeholder="Thumbnail"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                <FormErrorMessage>Thumbnail is required</FormErrorMessage>
              </FormControl>
{/* 
              <FormControl
                mt={4}
                isRequired
                isInvalid={subject.trim().length === 0}
              >
                <FormLabel fontSize="15px">Subject</FormLabel>
                <Input
                  fontSize="15px"
                  value={subject}
                  height="40px"
                  ref={initialRef}
                  placeholder="Thumbnail"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <FormErrorMessage>Subject is required</FormErrorMessage>
              </FormControl> */}

              {/* <FormControl mt={4} isRequired isInvalid={!isGradeValid}>
                <FormLabel fontSize="15px">Grade</FormLabel>
                <Input
                  fontSize="15px"
                  value={grade}
                  height="40px"
                  ref={initialRef}
                  placeholder="Grade"
                  onMouseDown={(e) => valchange(true)}
                  onChange={handleGradeChange}
                  onBlur={validateGrade}
                />
                <FormErrorMessage>
        {isGradeValid ? "" : "Grade must be in the format: YYYY A/L or YYYY O/L"}
      </FormErrorMessage>
              </FormControl> */}
 
 <FormControl mt={4} isRequired>
  <FormLabel fontSize="15px">Course Visibility</FormLabel>
  
  <RadioGroup value={visibility} onChange={(e) => setVisibility(e)}>
    <Stack spacing={4} direction="row">
      <Radio value="PRIVATE">Private</Radio>
      <Radio value="PUBLIC">Public</Radio>
    </Stack>
  </RadioGroup>
  
  <FormErrorMessage>Course Type is Required</FormErrorMessage>
</FormControl> 

              <FormControl
                mt={4}
                isRequired
                isInvalid={medium.trim().length === 0}
              >
                <FormLabel fontSize="15px">Medium</FormLabel>
                <Select
                  fontSize="15px"
                  value={medium}
                  height="40px"
                  ref={initialRef}
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setMedium(e.target.value)}
                >
                  <option value={medium}>{medium}</option>
                  {medium === "Sinhala" && (
                    <option value="English">English</option>
                  )}
                  {medium === "English" && (
                    <option value="Sinhala">Sinhala</option>
                  )}

                  {/* <option value='Sinhala'>Sinhala</option>
                       <option value='English'>English</option> */}
                </Select>

                <FormErrorMessage>Medium is Required</FormErrorMessage>
              </FormControl>




              <FormControl mt={4} isRequired>
  <FormLabel fontSize="15px">Day</FormLabel>
  <Select
    fontSize="15px"
    value={day}
    height="40px"
    ref={initialRef}

    onMouseDown={(e) => valchange(true)}
    onChange={(e) => setDay(e.target.value)}
  >
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thurseday">Thurseday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
    {/* Add other days here */}
  </Select>
  <FormErrorMessage>Day is required</FormErrorMessage>
</FormControl>


<FormControl mt={4} isRequired>
  <FormLabel fontSize="15px">Start Time</FormLabel>
  <Input
    value={startTime}
    onChange={(e) => setStartTime(e.target.value)}
    type="time"
    fontSize="15px"
    height="40px"
    ref={initialRef}
    placeholder="Start Time"
    onMouseDown={(e) => valchange(true)}
  />
  <FormErrorMessage>Start Time is required</FormErrorMessage>
</FormControl>

<FormControl mt={4} isRequired>
  <FormLabel fontSize="15px">End Time</FormLabel>
  <Input
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
    type="time"
    fontSize="15px"
    height="40px"
    ref={initialRef}
    placeholder="End Time"
    onMouseDown={(e) => valchange(true)}
  />
  <FormErrorMessage>End Time is required</FormErrorMessage>
</FormControl>



            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                fontSize="14px"
                height="30px"
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose} fontSize="14px" height="30px">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      
    </>
  );
};

export default Courseeditbutton;
