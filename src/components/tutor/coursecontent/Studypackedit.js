import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,Box,HStack
} from "@chakra-ui/react";
import { DatePicker } from '@mantine/dates';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
 import { useLocation } from "react-router-dom";

 

const Studypackedit = ({ course}) => {
  const axiosPrivate = useAxiosPrivate();
  
  const [coursesdata, setCoursesData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [subject, setSubject] = useState("");
  const [course_id, setCourse_Id] = useState("");
  const [validation, valchange] = useState(false);
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  const [expireDate, setExpireDate] = useState(new Date());

  const location = useLocation();
  const Studypackid = location.pathname.split("/").pop();
  const toast = useToast();

  useEffect(() => {
    const getStudypack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${course}`, {
          signal: controller.signal,
        });
        const courseData = response.data;

        // Set the initial values for title, description, and monthly_fee
        setTitle(courseData.title);
        setDescription(courseData.description);
        setPrice(courseData.price.toString());
        // setThumbnail(courseData.thumbnail); // Convert to string if necessary
        setSubject(courseData.subject);
        setCourse_Id(courseData.course_id);
        setDays(courseData.access_period.days);
        setMonths(courseData.access_period.months);
        setYears(courseData.access_period.years);
        setExpireDate(new Date(courseData.expire_date)); 

      } catch (error) {
        console.log(error);
      }
    };
    getStudypack();
  }, [axiosPrivate, Studypackid]);

  ;

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


  const [val, setValidation] = useState(false);
  const handleChange = (value) => {
    // Only set the monthly_fee if the value is a valid number
    if (value === null || !isNaN(value)) {
      setPrice(value);
      setValidation(false);
    } else {
      // If the value is not a valid number, mark it as invalid
      setValidation(true);
    }
  };



  const [selectedCourseId, setSelectedCourseId] = useState("");

  // Step 2: Find the course title based on the selected course ID
  // const selectedCourseTitle =
  // coursesdata && coursesdata.find((course) => course.id === selectedCourseId)?.title || "";

  useEffect(() => {
    if (coursesdata && coursesdata.length > 0) {
      setSelectedCourseId(course_id); // Set the selectedCourseId to the course_id from the response
    }
  }, [coursesdata, course_id]);




  const handlesubmit = (e) => {
    e.preventDefault();

    const isFormValid =
    title.trim().length !== 0 &&
    description.trim().length !== 0 &&
    description.length <= 100 &&
    price.trim().length !== 0 &&
    !isNaN(price) &&
    parseFloat(price) >= 0 &&
    // thumbnail.trim().length !== 0 &&
    subject.trim().length !== 0;
    // expireDate >= new Date();

  if (!isFormValid) {
    // alert("Please fill in all the required fields correctly.");
    return;
  }

    const coursedata = {
      id: Studypackid,
      title,
      description,
      price,
      // thumbnail,
      subject,
      course_id,
      // expire_date: expireDate.toISOString(),
   
    };

    axiosPrivate
      .put(`/tutor/studypack/${course}`, coursedata)
      .then((response) => {
       
        toast({
          title: "Studypack Details Updated",
          description: "The Studypack details have been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => {
            // Reload the page after the toast is manually closed
            window.location.reload();
          },
        });
        onClose();
       
       
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  if (coursesdata === null) {
    return <div>Loading...</div>;
  }








  return (
    <>
      <Button fontSize="10px" colorScheme="blue" height="20px" onClick={onOpen}>
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
            <ModalHeader>Update Study Pack Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} height='450px' overflowY="scroll">
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
                />
                <FormErrorMessage>Title is required</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={
                  description.trim().length === 0 || description.length > 100 
                }
              >
                <FormLabel fontSize="15px">Description</FormLabel>
                <Input
                  fontSize="15px"
                  value={description}
                  height="40px"
                  ref={initialRef}
                  placeholder="Description"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setDescription(e.target.value)}
                />
           <FormErrorMessage>
    {description.trim().length === 0
      ? "Description is required"
      : description.length > 100
      ? "Description should be 100 characters or less"
      : null}
  </FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={
                  price.trim().length === 0 || parseFloat(price) < 0
                }
              >
                <FormLabel fontSize="15px">Price</FormLabel>
                <NumberInput
                  value={price}
                  precision={2}
                  onChange={handleChange}
                  
                >
                  <NumberInputField
                    fontSize="15px"
                    height="40px"
                    placeholder="Price"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Price is Required</FormErrorMessage>
              </FormControl>

              {/* <FormControl
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
              </FormControl> */}





              {/* <FormControl
                mt={4}
                isRequired
                isInvalid={thumbnail.trim().length === 0}
              >
                <FormLabel fontSize="15px">Course ID</FormLabel>
                <Input
                  fontSize="15px"
                  value={selectedCourseId}
                  height="40px"
                  ref={initialRef}
                  placeholder="Thumbnail"
                  onMouseDown={(e) => valchange(true)}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
                <FormErrorMessage>Thumbnail is required</FormErrorMessage>
              </FormControl> */}


          {/* <FormControl mt={4} >
        <FormLabel fontSize="16px">Course</FormLabel>
 <Select
  mt="10px"
  ref={initialRef}
  onMouseDown={(e) => valchange(true)}
  onChange={(e) => setCourse_Id(e.target.value)}
  value={selectedCourseId}
>
<option key={selectedCourseId} value={selectedCourseId}>
          {selectedCourseTitle}
        </option>
  {coursesdata &&
    coursesdata.map((course) =>
      course.id === selectedCourseId ? null : (
        <option key={course.id} value={course.id}>
          {course.title}
        </option>
      )
    )}
</Select>
      </FormControl> */}




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
              </FormControl>

              <FormControl>
  <FormLabel fontSize="15px">Current Exp Date</FormLabel>
  <Input
    fontSize="15px"
    value={expireDate.toLocaleDateString()}
    height="40px"
    ref={initialRef}
    readOnly
    isReadOnly // Disable user input
 
  />

</FormControl>

 

{/* <FormControl mt={4} isRequired      isInvalid={expireDate < new Date()} >
  <FormLabel fontSize="15px">Update Exp Date</FormLabel>
  <DatePicker
    selected={expireDate}
    onChange={(date) => {
      if (date >= new Date()) {
        setExpireDate(date);
      }
    }}
    dateFormat="yyyy-MM-dd"

  />

    <FormErrorMessage>Expiration date cannot be before today</FormErrorMessage>
  
</FormControl> */}

      

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

export default Studypackedit;
