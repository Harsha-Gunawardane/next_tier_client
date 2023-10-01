import React, { useState, useEffect } from 'react';
import { ChakraProvider, Text, Heading, Box, HStack } from "@chakra-ui/react";
import Addannouncement from "./Addannouncement";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation } from 'react-router-dom';

const Announcement = (props) => {
  const [announcementData, setAnnouncementData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split('/').pop();

  const getAnnouncementData = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/course/${id}`);
      const courseData = response.data;
      setAnnouncementData(courseData.announcements);
    } catch (error) {
      console.log('Error fetching announcement data:', error);
    }
  };

  useEffect(() => {
    getAnnouncementData();
  }, [axiosPrivate, id]);

  // Sort the announcements by date and time and select the latest 2
  const sortedAnnouncements = announcementData.slice().sort((a, b) => {
    // Compare by date and time
    const dateComparison = a.day.localeCompare(b.day);
    if (dateComparison === 0) {
      return a.time.localeCompare(b.time);
    }
    return dateComparison;
  });

  const latestAnnouncements = sortedAnnouncements.slice(-2).reverse();

  return (
    <ChakraProvider>
      <Box bg='white' p={5} ml={{ base: -85, xl: 0 }}>
        <Heading fontSize='20px' mt='-20px' mb='10px' fontWeight='xl'>Announcement</Heading>
        {latestAnnouncements.map((item, index) => (
          <Box key={index} bg='white' mt='20px' width={{ base: 350, xl: 320 }} p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderLeft='6px solid red'>
            <Text fontSize='16px' color='grey'>{item.heading}</Text>
            <HStack mt='8px' spacing='30px'>
              <Text fontSize='12px' color='grey'>{item.day}</Text>
              <Text fontSize='12px' color='grey'>{item.time}</Text>
            </HStack>
          </Box>
        ))}
        <Addannouncement setannouncementData={setAnnouncementData}/>
      </Box>
    </ChakraProvider>
  );
};

export default Announcement;
