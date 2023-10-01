import React, { useEffect, useState } from "react";
import {
  Heading,
  ChakraProvider,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Course = (props) => {
  const [pollData, setPollData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false); // Track if the user has voted

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/details/" + id);
  };

  const Coursecontent = (id) => {
    navigate("/tutor/courses/content/" + id);
  };

  const getPollData = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/courses/poll`);
      setPollData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching poll data: ", error);
    }
  };

  const handleOptionChange = (value) => {
    if (!hasVoted) {
      setSelectedOption(value);
    }
  };

  const handleVote = () => {
    if (selectedOption) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedOption]: (prevVotes[selectedOption] || 0) + 1,
      }));
      setSelectedOption("");
      setHasVoted(true);
    }
  };

  useEffect(() => {
    getPollData();
  }, [axiosPrivate]);

  return (
    <>
      <ChakraProvider>
        <Heading>hhhhhh</Heading>

        {loading ? (
          <div>Loading courses...</div>
        ) : pollData.length > 0 ? (
          <div>
            <Heading fontSize="25px">Poll Data</Heading>
            <ul>
              {pollData.map((poll) => (
                <li key={poll.id}>
                  <p>{poll.question}</p>
                  <RadioGroup
                    value={selectedOption}
                    onChange={(value) => handleOptionChange(value)}
                  >
                    <Stack spacing={2}>
                      {poll.options.map((option) => (
                        <Radio
                          key={option}
                          value={option}
                          isDisabled={hasVoted}
                        >
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                  {!hasVoted ? (
                    <Button onClick={handleVote} colorScheme="teal" mt={2}>
                      Vote
                    </Button>
                  ) : (
                    <Box mt={2}>
                      <Progress
                        value={
                          (votes[poll.options[0]] /
                            (votes[poll.options[0]] +
                              votes[poll.options[1]] +
                              votes[poll.options[2]] +
                              votes[poll.options[3]] +
                              votes[poll.options[4]])) *
                          100
                        }
                        colorScheme="teal"
                        hasStripe
                        isAnimated
                      />
                      {Object.keys(votes).map((option) => (
                        <div key={option}>
                          {option}: {votes[option]}
                        </div>
                      ))}
                    </Box>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Heading fontSize="25px">No Poll Data Available</Heading>
        )}
      </ChakraProvider>
    </>
  );
};

export default Course;
