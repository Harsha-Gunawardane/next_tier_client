import React, { useEffect, useState } from "react";
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams, useLocation } from "react-router-dom";

const Coursepackedit = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [studypackdata, setstudypackdata] = useState({});
  const location = useLocation();
  const iid = location.pathname.split("/").pop();

  useEffect(() => {
    const getStudyPack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${iid}`, {
          signal: controller.signal,
        });
        setstudypackdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudyPack();
  }, [axiosPrivate]);

  return (
    <Box overflowY="scroll">
      {studypackdata && (
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Video IDs
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {studypackdata.public_ids[0].video_id.map((videoId) => (
                <p key={videoId}>{videoId}</p>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};

export default Coursepackedit;
