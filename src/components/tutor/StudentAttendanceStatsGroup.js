import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import MiniStatCardIcon from "../icons/MiniStatCardIcon";
import MiniStat from "../../components/Card/MiniStat";


//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import DonutChart from "../mcq/DonutChartStats";
import { FaUserCheck, FaUserMinus } from "react-icons/fa";


export function StudentAttendanceStatsGroup({
  No_of_PresentStudents,
  No_of_AbsentStudents,
}) {
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
            value={No_of_PresentStudents}
            endContent={
              <MiniStatCardIcon
                bg={"accentFaded"}
                color={"green"}
                icon={FaUserCheck}
              />
            }
          />
        </Box>

        <Box>
          <MiniStat
            name="Total Absent Students"
            value={No_of_AbsentStudents}
            endContent={
              <MiniStatCardIcon
                bg={"successFaded"}
                color={"red"}
                icon={FaUserMinus}
              />
            }
          />
        </Box>
      </SimpleGrid>
    </div>
  );
}
