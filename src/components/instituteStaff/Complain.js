import { Progress, Stack, Heading, Flex } from '@chakra-ui/react';

function Complain() {
  const progressStyle = {
    mx: 4,
    width: "250px",
  };

  const progress1 = {
    heading: 'Replied',
    value: 70,
  };

  const progress2 = {
    heading: 'Pending',
    value: 20,
  };

  const progress3 = {
    heading: 'Rejected',
    value: 10,
  };

  return (
    <div>
      <Stack spacing={10}>
        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress1.heading}
          </Heading>
          <Progress
            colorScheme='blue'
            size='md'
            value={progress1.value}
            style={progressStyle}
          />
        </Flex>

        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress2.heading}
          </Heading>
          <Progress
            colorScheme='blue'
            size='md'
            value={progress2.value}
            style={progressStyle}
          />
        </Flex>

        <Flex alignItems="center">
          <Heading size="sm" ml={10} mr={10}>
            {progress3.heading}
          </Heading>
          <Progress
            colorScheme='blue'
            size='md'
            value={progress3.value}
            style={progressStyle}
          />
        </Flex>
      </Stack>
    </div>
  );
}

export default Complain;
