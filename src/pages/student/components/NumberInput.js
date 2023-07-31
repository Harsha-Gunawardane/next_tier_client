import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const NumberInput = ({value, setValue}) => {
  // const [value, setValue] = useState(10); // Set default value to 10

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + 5, 50));
  };

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(prevValue - 5, 0));
  };

  return (
    <InputGroup size="md" mt={3}>
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
          size="sm"
          onClick={handleIncrement}
          disabled={value >= 50}
        />
        <IconButton
          aria-label="Decrement"
          icon={<MinusIcon />}
          size="sm"
          onClick={handleDecrement}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default NumberInput;
