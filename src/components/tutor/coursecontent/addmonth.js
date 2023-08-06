import React, { useState,useEffect } from "react";
import { Box, Heading, Input, Button,Select } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

const Addmonth = ({ onClose }) => {
  const [month, setMonth] = useState("");
  const [name, setName] = useState("");
  const [validation, setValidation] = useState(false);
  const[coursesdata,setCoursesData]=useState(null);

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const [studypack_ids, setStudyPackIds] = useState([]);



  useEffect(() => {
    const getStudyPack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudyPack();
  }, [axiosPrivate]);


  const filteredStudyPacks = coursesdata
    ? coursesdata.filter((course) => course.course_id === id)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the new study pack object with the selected study pack ID and name
    const newStudyPack = { [name]: month };

    // Make the API call to update the course with the new data
    axiosPrivate
      .put(`/tutor/course/studypack/${id}`, {
        studypack_ids: [newStudyPack, ...studypack_ids],
      })
      .then((response) => {
        alert("Saved successfully.");
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (

    <>
      <Accordion allowToggle>
        <AccordionItem bg="white" height="30px" width={{ base: 400, xl: 700 }}>
          <h2>
            <AccordionButton bg="white" border="2px dashed grey" height="35px" fontSize="15px">
              <Box as="span" flex="1" textAlign="left">
                <Text ml={{ base: 120, xl: 280 }}> + Add Content</Text>
              </Box>
            </AccordionButton>
          </h2>
          <form onSubmit={handleSubmit}>
            <AccordionPanel pb={4} boxShadow="0 3px 10px rgb(0 0 0 / 0.2)" borderRadius="10px">
              <Heading fontSize="20px" mb="10px">
                Add Content
              </Heading>
            <Select
                fontSize="15px"
                height="30px"
                onMouseDown={(e) => setValidation(true)}
                onChange={(e) => setMonth(e.target.value)}
                className="form-control"
                placeholder="Select Studypack ID"
              >
                       {filteredStudyPacks.map((course) => (
                    <option key={course.id} value={course.id}>
                       {course.title}
                    </option>
                  ))}
              </Select>

              <Input
                fontSize="15px"
                height="30px"
                onMouseDown={(e) => setValidation(true)}
                onChange={(e) => setName(e.target.value)} 
                className="form-control"
                placeholder="Name"
              />
              
              

              <Button type="submit" height="30px" mt="20px" colorScheme="blue" fontSize="12px">
                Add
              </Button>
            </AccordionPanel>
          </form>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Addmonth;
