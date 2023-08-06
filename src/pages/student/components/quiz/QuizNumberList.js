import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const GridWithNumbers = ({count}) => {
  const numbers = Array.from({ length: count }, (_, index) => index + 1);

  const trace = useSelector((state) => state.questions.trace);
  const result = useSelector((state) => state.result.result);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={3}>
      {numbers.map((number) => (
        <GridItem
          key={number}
          w={10}
          h={10}
          bg={
            trace + 1 === number
              ? "#1294F2"
              : result[number - 1] !== undefined
              ? "#BBBBBB"
              : "#EDEDED"
          }
          color={trace + 1 === number ? "#FFFFFF" : "#444444"}
          borderRadius={50}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {number}
        </GridItem>
      ))}
    </Grid>
  );
};

export default GridWithNumbers;
