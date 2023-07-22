import { Grid, GridItem } from "@chakra-ui/react"; // Assuming you are using Chakra UI

const GridWith20Numbers = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1); // Generate an array of numbers from 1 to 20

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={3}>
      {numbers.map((number) => (
        <GridItem
          key={number}
          w={10}
          h={10}
          bg="#EDEDED"
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

export default GridWith20Numbers;
