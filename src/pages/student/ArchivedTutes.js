import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { BsArchiveFill } from "react-icons/bs";

import TuteCard from "./components/cards/TuteCard";
import timesAgo from "../../utils/timesAgo";
import { useArchivedTutes } from "../../store/student/useArchivedTutes";

function ArchivedTutes() {

  const [archiveTutes, setArchiveTutes] = useState([]);
  const { archivedTutes } = useArchivedTutes();

  useEffect(() => {
    setArchiveTutes(archivedTutes);
  }, [archivedTutes]);

  return (
    <Box w={"100%"}>
      <Text ml={8} mt={5} fontSize={18} color={"#333"} fontWeight={"semibold"}>
        Archived tutes
      </Text>
      <Box w={"100%"} p={5}>
        <SimpleGrid minChildWidth="200px" spacing="40px">
          {archiveTutes.map((tute) => {
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
