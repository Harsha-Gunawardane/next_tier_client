import { Box, SimpleGrid, Text } from "@chakra-ui/react";

export function StatsGroup() {
  
  return (
    <div>
      <SimpleGrid
        cols={4}
        spacing={12}
        minChildWidth="140px"
        maxChildWidth="200px"
        padding="10px"
        margin="5px auto" 
        marginTop="10px"
        maxWidth="1000px"
      >
        <Box
          boxShadow="0 0.3rem 0.5rem rgba(68, 68, 68, 0.3)"
          borderRadius="5px"
          padding="8px"
        >
          <Text
            tt="uppercase"
            fontWeight={700}
            fontSize="16px"
            color="gray"
            paddingLeft="10px"
            c="dimmed"
            borderLeft="4px solid gray"
          >
            Total Mcqs
          </Text>
          <Text fontWeight={700} fontSize="28px" color="blue.400">
            600
          </Text>
        </Box>
        <Box
          boxShadow="0 0.3rem 0.5rem rgba(68, 68, 68, 0.3)"
          borderRadius="5px"
          padding="8px"
        >
          <Text
            tt="uppercase"
            fontWeight={700}
            fontSize="16px"
            color="gray"
            paddingLeft="10px"
            c="dimmed"
            borderLeft="4px solid gray"
          >
            Average Mcqs
          </Text>
          <Text fontWeight={700} fontSize="28px" color="pink.400">
            200
          </Text>
        </Box>
        <Box
          boxShadow="0 0.3rem 0.5rem rgba(68, 68, 68, 0.3)"
          borderRadius="5px"
          padding="8px"
        >
          <Text
            tt="uppercase"
            fontWeight={700}
            fontSize="16px"
            color="gray"
            paddingLeft="10px"
            c="dimmed"
            borderLeft="4px solid gray"
          >
            Hard Mcqs
          </Text>
          <Text fontWeight={700} fontSize="28px" color="orange.400">
            100
          </Text>
        </Box>
      </SimpleGrid>
    </div>
  );
}
