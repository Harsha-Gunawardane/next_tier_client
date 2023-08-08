import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

const Addmonth = ({ onClose }) => {
  const [name, setName] = useState("");
  const [validation, setValidation] = useState(false);
  const [studypack_ids, setStudyPackIds] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the new week object
    const newWeek = {
      [name]: {
        tute_id: [], // Add tute_ids if any
        video_id: [],
        quiz_id: [], // Add quiz_ids if any
      },
    };
    // Make the API call to update the course with the new data
    axiosPrivate
      .put(`/tutor/studypack/content/${id}`, {
        name: name, // Pass the name here
        studypack_ids: [newWeek, ...studypack_ids],
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
        <AccordionItem bg="white" height="30px" width={{ base: 398, xl: 400 }}>
          <h2>
            <AccordionButton
              bg="white"
              border="2px dashed grey"
              height="35px"
              fontSize="15px"
            >
              <Box as="span" flex="1" textAlign="left">
                <Text ml={{ base: 140, xl: 135 }} fontSize={{base:13,xl:15}}> + Add Content</Text>
              </Box>
            </AccordionButton>
          </h2>
          <form onSubmit={handleSubmit}>
            <AccordionPanel
              pb={4}
              boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
              borderRadius="10px"
            >
              <Heading fontSize="20px" mb="10px">
                Add Content
              </Heading>
              <Input
                fontSize="15px"
                height="30px"
                onMouseDown={(e) => setValidation(true)}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name"
              />
              <Button
                type="submit"
                height="30px"
                mt="20px"
                colorScheme="blue"
                fontSize="12px"
              >
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
