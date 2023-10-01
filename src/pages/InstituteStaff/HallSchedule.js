import React, { useState, useEffect  } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Flex,
  Button,
  Heading,
  Box,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Event from "../../components/Hall/Event";
import CustomHeader from "../../components/Hall/CustomHeader";
import Schedule from "../../components/Hall/Schedule";
import "./styles/hallSchedule.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ButtonStyles = {
  backgroundColor: "blue.400",
  color: "white",
  borderRadius: "5px",
  _hover: {
    backgroundColor: "blue.300",
  },
};


const colors = ["#DBC4F0", "#CCEEBC", "#FFD9C0", "#C8FFE0", "#FFB7B7"];


function HallSchedule() {
  const localizer = momentLocalizer(moment);
const [isModalOpen, setIsModalOpen] = useState(false);
const [events, setEvents] = useState([]);
const toast = useToast();
const axiosPrivate = useAxiosPrivate();

const openModal = () => {
    setIsModalOpen(true);
  };

const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/schedule");
        const eventsWithColors = response.data.map((event, index) => ({
          ...event,
          backgroundColor: colors[index % colors.length],
        }));
    
        setEvents(eventsWithColors);
        
      } catch (error) {
        console.error("Error fetching hall schedules:", error);
        toast({
          title: "Error",
          description: "Error fetching hall schedules. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchScheduleDetails();
  }, [toast, axiosPrivate]);

 
  const getEventStyle = (event, start, end, isSelected) => {
    const colorIndex = event.id % colors.length; // Get the color index based on event id
    const backgroundColor = colors[colorIndex]; // Get the color from the array
  
    return {
      style: {
        ...eventStyles,
        backgroundColor: event.backgroundColor || backgroundColor,
      },
    };
  };

  const calendarStyle = {
    height: 600,
    width: "100%",
  };

  const breakpointValue = useBreakpointValue({
    base: "center",
    md: "flex-start",
  });

  const eventStyles = {
    color: "black",
    borderRadius: "5px",
    justifyContent: breakpointValue,
    alignItems: breakpointValue,
    width: useBreakpointValue({ base: "80px", md: "155px" }),
    height: "35px",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [editedEvent, setEditedEvent] = React.useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
    setEditedEvent(event);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditedEvent(null);
  };

  const DragAndDropCalendar = withDragAndDrop(Calendar);

  // const handleEventDrop = ({ event, start, end }) => {
  //   const eventIndex = events.findIndex((e) => e.id === event.id);

  //   if (eventIndex !== -1) {
  //     const updatedEvent = {
  //       ...event,
  //       start,
  //       end,
  //     };

  //     const updatedEvents = [
  //       ...events.slice(0, eventIndex),
  //       updatedEvent,
  //       ...events.slice(eventIndex + 1),
  //     ];

  //     setEvents(updatedEvents);
  //   }
  // };
  const handleEventDrop = ({ event, start, end }) => {
    const eventIndex = events.findIndex((e) => e.id === event.id);
  
    if (eventIndex !== -1) {
      const updatedEvent = {
        ...event,
        start,
        end,
      };
  
      const updatedEvents = [
        ...events.slice(0, eventIndex),
        updatedEvent,
        ...events.slice(eventIndex + 1),
      ];
  
      // Update the event in the database
      updateEventDetails(updatedEvent);
  
      // Update the local state with the updated events
      setEvents(updatedEvents);
    }
  };
  
  const updateEventDetails = (updatedEvent) => {
   
    // Perform an authenticated API request to update the event data in the database
    axiosPrivate
      .put(`/staff/schedule/${updatedEvent.id}`, {
        // date: updatedEvent.date,
        // ... other event properties you want to update ...
      })
      .then((response) => {
        console.log("Event updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        // Handle the error here, e.g., show an error message to the user
      });
  };
  
  return (
    <Box width="100%" mx={{ base: "10", md: "10" }} >
      <Flex
        direction={["column", "row"]}
        justify="space-between"
        align="center"
        mt="5"
        ml={["0", "2"]}
        mr={["0", "25px"]}
      >
        <Heading
          fontSize={{ base: 20, md: 20 }}
          color="#242424"
          ml="2"
          mb={{ base: "4", md: "0" }}
        >
          Hall Schedule
        </Heading>

        <Flex align="center" pr={10}>
          <Button size={{ base: "sm", md: "md" }} onClick={openModal} sx={ButtonStyles} mr={2}>
            Schedule a Hall
          </Button>

          <NavLink to="view">
            <Button size={{ base: "sm", md: "md" }} sx={ButtonStyles}>
              View Hall Details
            </Button>
          </NavLink>
        </Flex>
        <Schedule isOpen={isModalOpen} onClose={closeModal} />
      </Flex>

      <Box mt="5" display="flex" justifyContent="center" mr={20}>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={calendarStyle}
          onSelectEvent={handleEventClick}
          eventPropGetter={getEventStyle}
          components={{
            toolbar: (props) => <CustomHeader {...props} />,
          }}
          onEventDrop={handleEventDrop}
        />
      </Box>

      <Event
        isOpen={isOpen}
        onClose={handleCloseModal}
        event={editedEvent || selectedEvent}
      />
    </Box>
  );
}

export default HallSchedule;