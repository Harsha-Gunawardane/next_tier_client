import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import TuteCard from "./components/cards/TuteCard";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AiFillStar } from "react-icons/ai";

import timesAgo from "../../utils/timesAgo";

const TUTE_URL = "/stu/tute";
function StarredTutes() {
  const axiosPrivate = useAxiosPrivate();

  const [starredTutes, setStarredTutes] = useState([]);

  const getStarredTutes = async () => {
    try {
      const response = await axiosPrivate.get(`${TUTE_URL}/star`);
      console.log(response.data);
      setStarredTutes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStarredTutes();
  }, []);

  return (
    <Box w={"100%"}>
      <Text ml={8} mt={5} fontSize={18} color={"#333"} fontWeight={"semibold"}>
        Starred tutes
      </Text>
      <Box w={"100%"} p={5}>
        <SimpleGrid minChildWidth="200px" spacing="40px">
          {starredTutes.map((tute) => {
            return (
              <TuteCard
                key={tute.id}
                id={tute.id}
                title={tute.name}
                content={tute.description}
                time={timesAgo(tute.recent_activity)}
                icon={<AiFillStar fontSize={16} color="#ECC330" />}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default StarredTutes;
