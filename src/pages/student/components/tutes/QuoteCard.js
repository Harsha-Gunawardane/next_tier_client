import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import quoteImage from "../../../../assests/images/girl1.jpg";

function QuoteCard() {
  const [quotes, setQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    try {
      fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => setQuotes(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, [quotes]);

  return (
    <Box w={770} mt={5}>
      <Text
        ml={3}
        fontSize={18}
        fontWeight="bold"
        color={"#555555"}
        fontStyle="Roboto"
        mb={3}
      >
        Daily quote
      </Text>
      <Flex
        ml={2}
        gap={5}
        border={"1px solid #E9E9E9"}
        shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      >
        <Image
          shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
          m={3}
          borderRadius={5}
          w={20}
          h={20}
          objectFit="cover"
          src={quoteImage}
        />
        <Flex alignItems={"center"}>
          <Box>
            <Text fontSize={15} color={"#444444"}>
              {quotes[quoteIndex] ? quotes[quoteIndex].text : "Our greatest fear should not be of failure, but of succeeding at things in life that don’t really matter."}
            </Text>
            <Text fontSize={12} color={"#666666"}>
              {quotes[quoteIndex] ? quotes[quoteIndex].author : "– Francis Chan"}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default QuoteCard;
