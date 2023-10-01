import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import MiniStatCardIcon from "../icons/MiniStatCardIcon";
import MiniStat from "../Card/MiniStat";


//icons
import { BiBook } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import PapersDonutChartStats from "./PapersDonutChartStats";


export function PaperStatsGroup() {
  return (
    <div>
      <Grid
        gap={4}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(7, 1fr)"
        padding="10px"
        margin="2px auto"
        marginTop="5px"
        maxWidth="1220px"
      >
        <GridItem
          rowSpan={2}
          colSpan={3}
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
            paddingBottom="15px"
          >
            Mark Analysis
          </Text>
          <PapersDonutChartStats />
        </GridItem>

        <GridItem rowSpan={1} colSpan={2}>
          <MiniStat
            name="Total Papers"
            value="08"
            endContent={
              <MiniStatCardIcon
                bg={"accentFaded"}
                color={"blue"}
                icon={BiBook}
              />
            }
          />
        </GridItem>

        <GridItem rowSpan={1} colSpan={2}>
          <MiniStat
            name="Average Paper Marks (MCQ)"
            value="30%"
            endContent={
              <MiniStatCardIcon
                bg={"successFaded"}
                color={"green"}
                icon={AiOutlineFileDone}
              />
            }
          />
        </GridItem>

        <GridItem rowSpan={1} colSpan={2}>
          <MiniStat
            name="Average Paper Marks (Structured)"
            value="56%"
            endContent={
              <MiniStatCardIcon
                bg={"dangerFaded"}
                color={"red"}
                icon={AiOutlineFileDone}
              />
            }
          />
        </GridItem>

        <GridItem rowSpan={1} colSpan={2}>
          <MiniStat
            name="Highest Paper Mark"
            value="86"
            endContent={
              <MiniStatCardIcon
                bg={"dangerFaded"}
                color={"red"}
                icon={AiOutlineFileDone}
              />
            }
          />
        </GridItem>
      </Grid>
    </div>
  );
}
