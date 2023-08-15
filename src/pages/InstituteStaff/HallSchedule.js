import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Flex, Button, Heading, Box, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Event from "../../components/Hall/Event";
import CustomHeader from "../../components/Hall/CustomHeader";
import "./styles/hallSchedule.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const ButtonStyles = {
  backgroundColor: "blue.400",
  color: "white",
  borderRadius: "5px",
  _hover: {
    backgroundColor: "blue.300",
  },
};

const localizer = momentLocalizer(moment);

const colors = ["#DBC4F0", "#CCEEBC", "#FFD9C0"];

function HallSchedule() {
  const [events, setEvents] = React.useState( [
    {
      id: 1,
      title: "Physics 2024 A/L",
      hall: "W003",
      teacher: "Sujith Liyanage",
      start: new Date(2023, 7, 28, 8, 0),
      end: new Date(2023, 7, 28, 11, 0),
    },
    {
      id: 2,
      title: "ICT 2024 A/L",
      hall: "W003",
      teacher: "Sujith Liyanage",
      start: new Date(2023, 7, 28, 10, 0),
      end: new Date(2023, 7, 28, 13, 0),
    },
    {
      id: 3,
      title: "Chemistry 2024 A/L",
      hall: "W003",
      teacher: "Ajith Manamperi",
      start: new Date(2023, 7, 4, 13, 30),
      end: new Date(2023, 7, 4, 16, 30),
    },
    {
      id: 4,
      title: "ICT 2024 A/L",
      hall: "W003",
      teacher: "Sujith Liyanage",
      start: new Date(2023, 7, 28, 14, 0),
      end: new Date(2023, 7, 28, 17, 30),
    },
    {
      id: 5,
      title: "Biology 2024 A/L",
      hall: "W003",
      teacher: "Rangana Dahanayaka",
      start: new Date(2023, 7, 14, 13, 0),
      end: new Date(2023, 7, 14, 16, 30),
    },
    {
      id: 6,
      title: "Chemistry 2024 A/L",
      hall: "W003",
      teacher: "Osman Jayasinghe",
      start: new Date(2023, 7, 16, 12, 0),
      end: new Date(2023, 7, 16, 15, 30),
    },
    {
      id: 7,
      title: "Physics 2024 A/L",
      hall: "W003",
      teacher: "Prabath De Silva",
      start: new Date(2023, 6, 25, 12, 0),
      end: new Date(2023, 6, 25, 16, 0),
    },
  ]);

  
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
  // // Load events from localStorage on component mount
  // React.useEffect(() => {
  //   const storedEvents = localStorage.getItem("hallScheduleEvents");
  //   if (storedEvents) {
  //     setEvents(JSON.parse(storedEvents));
  //   }
  // }, []);

  const breakpointValue = useBreakpointValue({ base: "center", md: "flex-start" });

  const eventStyles = {
    color: "black",
    borderRadius: "5px",
    justifyContent: breakpointValue,
    alignItems: breakpointValue,
    width: useBreakpointValue({ base: "80px", md: "150px" }),
    height: "40px",
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

      setEvents(updatedEvents);
      //   // Save the updated events to localStorage
      // localStorage.setItem("hallScheduleEvents", JSON.stringify(updatedEvents));
    }
   
  };
  
  return (
    <Box width="100%"  mx={{ base: "2", md: "10" }} mr={30}>
      <Flex  direction={["column", "row"]}
          justify={["flex-start", "space-between"]}
          align={["flex-start", "center"]}
          mt="5"
          ml={["0", "2"]}
          mr={["0", "25px"]}>
        <Heading fontSize={{ base: 20, md: 20 }} color="#242424" ml="2" mb={{ base: "4", md: "0" }}>
          Hall Schedule
        </Heading>

        <NavLink to="view">
          <Button size={{ base: "sm", md: "md" }} sx={ButtonStyles} mr={10}>
            View Hall Details
          </Button>
        </NavLink>
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