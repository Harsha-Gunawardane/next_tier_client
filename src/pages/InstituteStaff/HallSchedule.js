import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Flex, Button, Heading, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Event from "../../components/Hall/Event";

const ButtonStyles = {
  backgroundColor: "blue.400",
  color: "white",
  borderRadius: "5px",
  _hover: {
    backgroundColor: "blue.300",
  },
};

const localizer = momentLocalizer(moment);
const events = [
  {
    id: 1,
    title: "Physics 2024 A/L",
    hall: "W003",
    teacher: "Sujith Liyanage",
    start: new Date(2023, 6, 28, 8, 0),
    end: new Date(2023, 6, 28, 11, 0),
  },
  {
    id: 2,
    title: "ICT 2024 A/L",
    hall: "W003",
    teacher: "Sujith Liyanage",
    start: new Date(2023, 6, 28, 10, 0),
    end: new Date(2023, 6, 28, 13, 0),
  },
  {
    id: 3,
    title: "Chemistry 2024 A/L",
    hall: "W003",
    teacher: "Ajith Manamperi",
    start: new Date(2023, 6, 4, 13, 30),
    end: new Date(2023, 6, 4, 16, 30),
  },
  {
    id: 4,
    title: "ICT 2024 A/L",
    hall: "W003",
    teacher: "Sujith Liyanage",
    start: new Date(2023, 6, 28, 14, 0),
    end: new Date(2023, 6, 28, 17, 30),
  },
  {
    id: 5,
    title: "Biology 2024 A/L",
    hall: "W003",
    teacher: "Rangana Dahanayaka",
    start: new Date(2023, 6, 14, 13, 0),
    end: new Date(2023, 6, 14, 16, 30),
  },
  {
    id: 6,
    title: "Chemistry 2024 A/L",
    hall: "W003",
    teacher: "Osman Jayasinghe",
    start: new Date(2023, 6, 16, 12, 0),
    end: new Date(2023, 6, 16, 15, 30),
  },
  {
    id: 7,
    title: "Physics 2024 A/L",
    hall: "W003",
    teacher: "Prabath De Silva",
    start: new Date(2023, 6, 25, 12, 0),
    end: new Date(2023, 6, 25, 16, 0),
  },
];

const colors = ["#DBC4F0", "#CCEEBC", "#FFD9C0"];

const eventStyles = {
  color: "black",
  borderRadius: "5px",
  width: "150px",
  height: "40px",
  border: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

function HallSchedule() {
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

  return (
    <Box width="100%" mx="10">
      <Flex justify="space-between" align="center" mt="5" mr="80px" width="100%">
        <Heading fontSize={20} color="#242424" ml="5">
          Hall Schedule
        </Heading>

        <NavLink to="view">
          <Button size={{ base: "sm", md: "md" }} sx={ButtonStyles}>
            View Hall Details
          </Button>
        </NavLink>
      </Flex>
      <Box mt="5">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={calendarStyle}
          onSelectEvent={handleEventClick}
          eventPropGetter={getEventStyle}
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