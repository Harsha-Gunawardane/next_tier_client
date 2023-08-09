import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import useAxiosPrivate from "./useAxiosPrivate";

const FetchContentDetailsAndShowThumbnail = ({ videoId }) => {
  const [thumbnail, setThumbnail] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/content/${videoId}`);
        if (response.data.thumbnail) {
          setThumbnail(response.data.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching content details:", error);
      }
    };

    fetchContentDetails();
  }, [axiosPrivate, videoId]);

  return (
    <Image
      boxSize="40px"
      width="80px" // Set the appropriate size
      objectFit="cover" // Set the appropriate objectFit value
      src={thumbnail}
      alt={`Thumbnail for video ${videoId}`}
    />
  );
};

export default FetchContentDetailsAndShowThumbnail;
