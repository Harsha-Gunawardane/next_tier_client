import React, { useState, useEffect } from "react";
import { Text,Button } from "@chakra-ui/react";
import useAxiosPrivate from "./useAxiosPrivate";// Make sure to import your axios instance

const FetchContentDetailsAndShowTitle = ({ videoId }) => {
  const [filepath, setFilepath] = useState("");
   const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/content/${videoId}`);
        if (response.data.file_path) {
          setFilepath(response.data.file_path);
        }
      } catch (error) {
        console.error("Error fetching content details:", error);
      }
    };

    fetchContentDetails();
  }, [videoId]);

  return(
    <>
        <Button
    fontSize="10px"
    height="20px"
    colorScheme="blue"
    onClick={() => {
      const fileUrl = filepath;
      window.open(fileUrl, '_blank');
    }} 
  >
    View
  </Button>
    </>

  
   )
};

export default FetchContentDetailsAndShowTitle;
