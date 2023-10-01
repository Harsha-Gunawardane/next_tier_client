import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import TuteCard from "./components/cards/TuteCard";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BsArchiveFill } from "react-icons/bs";

import timesAgo from "../../utils/timesAgo";

const TUTE_URL = "/stu/tute";
function ArchivedTutes() {
  const axiosPrivate = useAxiosPrivate();

  const [archivedTutes, setArchivedTutes] = useState([]);

  const getArchivedTutes = async () => {
    try {
      const response = await axiosPrivate.get(`${TUTE_URL}/archive`);
      console.log(response.data);
      setArchivedTutes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArchivedTutes();
  }, []);
  return (
    <Box w={"100%"}>
      <Text ml={8} mt={5} fontSize={18} color={"#333"} fontWeight={"semibold"}>
        Archived tutes
      </Text>
      <Box w={"100%"} p={5}>
        <SimpleGrid minChildWidth="200px" spacing="40px">
          {archivedTutes.map((tute) => {
            return (
              <TuteCard
                key={tute.id}
                id={tute.id}
                title={tute.name}
                content={tute.description}
                time={timesAgo(tute.recent_activity)}
                icon={<BsArchiveFill fontSize={16} color="#6CB86C" />}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default ArchivedTutes;
