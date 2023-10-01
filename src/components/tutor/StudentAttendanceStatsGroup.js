import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import MiniStatCardIcon from "../icons/MiniStatCardIcon";
import MiniStat from "../../components/Card/MiniStat";


//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import DonutChart from "../mcq/DonutChartStats";


export function StudentAttendanceStatsGroup() {
  return (
    <div>
      <SimpleGrid
        cols={2}
        spacing={8}
        minChildWidth="140px"
        maxChildWidth="200px"
        marginTop="10px"
        maxWidth="1120px"
        marginBottom="16px"
        padding="5px"
      >
        <Box>
          <MiniStat
            name="Total Present Students"
            value="08"
            endContent={
              <MiniStatCardIcon
                bg={"accentFaded"}
                color={"blue"}
                icon={BiBook}
              />
            }
          />
        </Box>

        <Box>
          <MiniStat
            name="Total Absent Students"
            value="200"
            endContent={
              <MiniStatCardIcon
                bg={"successFaded"}
                color={"green"}
                icon={AiOutlineFileDone}
              />
            }
          />
        </Box>

      </SimpleGrid>
    </div>
  );
}
