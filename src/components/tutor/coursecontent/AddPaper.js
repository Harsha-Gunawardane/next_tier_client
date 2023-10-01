import React, { useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
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
  const [validation, setValidation] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    // e.preventDefault();




    // Create the new study pack object with the automatically generated week data
    const newStudyPack = {
      [month]: {
        week1: {
          tute_id: [`${month}_week1_tute_1`, `${month}_week1_tute_2`],
          video_id: [`${month}_week1_video_1`, `${month}_week1_video_2`],
        },
        week2: {
          tute_id: [`${month}_week2_tute_1`, `${month}_week2_tute_2`],
          video_id: [`${month}_week2_video_1`, `${month}_week2_video_2`],
        },
        week3: {
          tute_id: [`${month}_week3_tute_1`, `${month}_week3_tute_2`],
          video_id: [`${month}_week3_video_1`, `${month}_week3_video_2`],
        },
        week4: {
          tute_id: [`${month}_week4_tute_1`, `${month}_week4_tute_2`],
          video_id: [`${month}_week4_video_1`, `${month}_week4_video_2`],
        },
      },
    };

    // Make the API call to update the course with the new data
    axiosPrivate
      .put(`/tutor/course/studypack/${id}`, {
        studypack_ids: [newStudyPack],
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
              <Input
                fontSize="15px"
                height="30px"
                onMouseDown={(e) => setValidation(true)}
                onChange={(e) => setMonth(e.target.value)}
                className="form-control"
                placeholder=""
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
