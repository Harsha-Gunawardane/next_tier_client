import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import useAxiosPrivate from "./useAxiosPrivate";// Make sure to import your axios instance

const FetchContentDetailsAndShowTitle = ({ quizId }) => {
  const [title, setTitle] = useState("");
   const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/quizzes/${quizId}`);
        if (response.data.title) {
          setTitle(response.data.title);
        }
      } catch (error) {
        console.error("Error fetching content details:", error);
      }
    };

    fetchContentDetails();
  }, [quizId]);

  return <Text fontSize="14px" className="box2">{title}</Text>;
};

export default FetchContentDetailsAndShowTitle;
