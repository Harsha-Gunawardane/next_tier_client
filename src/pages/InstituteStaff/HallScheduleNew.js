import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Flex, Button, Heading, Box, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Event from "../../components/Hall/Event";
import CustomHeader from "../../components/Hall/CustomHeader";
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

const localizer = momentLocalizer(moment);

const colors = ["#DBC4F0", "#CCEEBC", "#FFD9C0"];

function HallSchedule() {
  const axiosPrivate = useAxiosPrivate();
  const [events, setEvents] = useState([]);

  const getEventStyle = (event, start, end, isSelected) => {
    const colorIndex = event.id % colors.length;
    const backgroundColor = colors[colorIndex];

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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
    setEditedEvent(event);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditedEvent(null);
  };

  useEffect(() => {
    const fetchEventSchedule = async () => {
      try {
        console.log("Fetching events...");
        const response = await axiosPrivate.get("/staff/schedule");
        console.log("Fetched events:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventSchedule();
  }, [axiosPrivate]);

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
    }
  };

  return (
    <Box width="100%" mx={{ base: "2", md: "10" }}>
      <Flex
        direction={["column", "row"]}
        justify={["flex-start", "space-between"]}
        align={["flex-start", "center"]}
        mt="5"
        ml={["0", "2"]}
        mr={["0", "30px"]}
      >
        <Heading fontSize={{ base: 20, md: 24 }} color="#242424" ml="2" mb={{ base: "4", md: "0" }}>
          Hall Schedule
        </Heading>
        <NavLink to="view">
          <Button size={{ base: "sm", md: "md" }} sx={ButtonStyles}>
            View Hall Details
          </Button>
        </NavLink>
      </Flex>
      <Box mt="5" display="flex" justifyContent="center">
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor={(event) => new Date(event.start_time)}
          endAccessor={(event) => new Date(event.end_time)}
          style={calendarStyle}
          onSelectEvent={handleEventClick}
          eventPropGetter={getEventStyle}
          components={{
            toolbar: (props) => <CustomHeader {...props} />,
          }}
          onEventDrop={handleEventDrop}
        />
      </Box>
      <Event isOpen={isOpen} onClose={handleCloseModal} event={editedEvent || selectedEvent} />
    </Box>
  );
}

export default HallSchedule;
