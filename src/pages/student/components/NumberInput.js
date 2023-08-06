import React from "react";
import { useBreakpointValue, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const NumberInput = ({value, setValue}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + 5, 50));
  };

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(prevValue - 5, 5));
  };

  return (
    <InputGroup size={isMobile ? 'sm' : 'md'} mt={3}>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Math.min(parseInt(e.target.value), 50))}
        min={0}
        max={50}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          aria-label="Increment"
          icon={<AddIcon />}
          size={isMobile ? 'xs' : 'sm'}
          onClick={handleIncrement}
          disabled={value >= 50}
          mr={1}
        />
        <IconButton
          aria-label="Decrement"
          icon={<MinusIcon />}
          size={isMobile ? 'xs' : 'sm'}
          onClick={handleDecrement}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default NumberInput;
