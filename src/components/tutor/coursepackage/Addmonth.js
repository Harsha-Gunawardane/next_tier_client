import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

const Addmonth = ({ onClose, contentIdsData, setContentIdsData }) => {
  const [name, setName] = useState("");
  const [validation, setValidation] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [studypack_ids, setStudyPackIds] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion open/close

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameAlreadyExists = contentIdsData.some(
      (weekData) => weekData[name] !== undefined
    );

    if (nameAlreadyExists) {
      setNameExists(true);
      setValidation(false);
      return;
    }

    if (name.includes(" ")) {
      setValidation(true);
      setNameExists(false);
      return;
    }

    const newWeek = {
      [name]: {
        tute_id: [],
        video_id: [],
        quiz_id: [],
      },
    };

    setContentIdsData([...contentIdsData, newWeek]);

    axiosPrivate
      .put(`/tutor/studypack/content/${id}`, {
        name: name,
        studypack_ids: [newWeek, ...studypack_ids],
      })
      .then((response) => {
        onClose();
        setIsAccordionOpen(false); // Close the accordion panel
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem
          bg="white"
          height="30px"
          width={{ base: 398, xl: 400 }}
          isOpen={isAccordionOpen}
        >
          <h2>
            <AccordionButton
              bg="white"
              border="2px dashed grey"
              height="35px"
              fontSize="15px"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <Box as="span" flex="1" textAlign="left">
                <Text ml={{ base: 140, xl: 135 }} fontSize={{ base: 13, xl: 15 }}>
                  + Add New
                </Text>
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
                onChange={(e) => {
                  setName(e.target.value);
                  setNameExists(false);
                  setValidation(false);
                }}
                className={`form-control ${validation ? "is-invalid" : ""}`}
                placeholder="Name"
                value={name}
              />
              {nameExists && (
                <Alert status="error" mt="5px">
                  <AlertIcon />
                  Name already exists. Please enter a different name.
                </Alert>
              )}

              {validation && (
                <Alert status="error" mt="5px">
                  <AlertIcon />
                  Name should not contain spaces.
                </Alert>
              )}
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
