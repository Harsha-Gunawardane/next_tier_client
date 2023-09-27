import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import MiniStatCardIcon from "../icons/MiniStatCardIcon";
import MiniStat from "../../components/Card/MiniStat";


//icons
import { BiBook } from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import DonutChart from "../mcq/DonutChartStats";


export function StatsGroup() {
  return (
    <div>
      <SimpleGrid
        cols={4}
        spacing={8}
        minChildWidth="140px"
        maxChildWidth="200px"
        padding="10px"
        margin="2px auto"
        marginTop="10px"
        maxWidth="1120px"
      >
        <Box>
          <MiniStat
            name="Total Created Quizzes"
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
            name="Total Created MCQs"
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

        <Box>
          <MiniStat
            name="Average Quiz Marks"
            value="76%"
            endContent={
              <MiniStatCardIcon
                bg={"dangerFaded"}
                color={"red"}
                icon={AiOutlineFileDone}
              />
            }
          />
        </Box>

        <Box
          paddingTop="15px"
          paddingLeft="15px"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
          hover={{
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}
          borderRadius="10px"
        >
          <Text
            color="gray.600"
            fontSize={{
              base: "0.9rem",
            }}
            fontWeight={"bold"}
          >
            MCQ Difficulty Status
          </Text>
          <DonutChart />
        </Box>
      </SimpleGrid>
    </div>
  );
}
