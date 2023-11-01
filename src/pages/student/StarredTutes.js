import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

import timesAgo from "../../utils/timesAgo";
import { useStarredTutes } from "../../store/student/useStarredTutes";
import TuteCard from "./components/cards/TuteCard";

function StarredTutes() {

  const [staredTutes, setStaredTutes] = useState([]);

  const { starredTutes } = useStarredTutes();
  useEffect(() => {
    setStaredTutes(starredTutes);
  }, [starredTutes]);

  return (
    <Box w={"100%"}>
      <Text ml={8} mt={5} fontSize={18} color={"#333"} fontWeight={"semibold"}>
        Starred tutes
      </Text>
      <Box w={"100%"} p={5}>
        <SimpleGrid minChildWidth="200px" spacing="40px">
          {staredTutes.map((tute) => {
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
