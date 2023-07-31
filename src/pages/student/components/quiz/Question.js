import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Box, Text, RadioGroup, Radio, Stack } from "@chakra-ui/react";

import { PutAnswer } from "../../../../hooks/setResult";

function Question({ questionNo, question, options, trace }) {
  const result = useSelector(state => state.result.result)
  const [selectedValue, setSelectedValue] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedValue(result[trace])
  }, [trace])

  const handleRadioChange = (value) => {
    setSelectedValue(value); // Update the local state with the selected value
    dispatch(PutAnswer(trace, value));
    console.log(`onSelect ${value}`);
  };

  return (
    <Box mt={6} ml={12} w='90%' >
      <Text mb={4} fontSize={24} color="#333333" fontWeight="medium">
        {questionNo}
      </Text>

      <Text fontSize={15}>{question}</Text>
      <RadioGroup mt={8} value={selectedValue}>
        <Stack>
          {options.map((option, index) => (
            <Radio
              fontSize={15}
              lineHeight="taller"
              ml={8}
              value={index}
              id={index}
              key={index}
              onChange={() => handleRadioChange(index )}
              isChecked={selectedValue === index }
            >
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}

export default Question;
