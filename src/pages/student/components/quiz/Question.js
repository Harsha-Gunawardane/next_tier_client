import { Box, Text, RadioGroup, Radio, Stack } from "@chakra-ui/react";

function Question({ questionNo, question, options }) {
  return (
    <Box mt={6} ml={12} w={820} >
      <Text mb={4} fontSize={24} color="#333333" fontWeight="medium">
        {questionNo}
      </Text>

      <Text fontSize={15}>{question}</Text>
      <RadioGroup mt={8}>
        <Stack>
          {options.map((option, index) => (
            <Radio fontSize={15} lineHeight='taller' ml={8}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}

export default Question;
