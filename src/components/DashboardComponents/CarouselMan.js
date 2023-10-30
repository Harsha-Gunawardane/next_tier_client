import React from 'react';
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import {
  Text,
  Image,
  Flex,
  AspectRatio,
} from '@chakra-ui/react';
import _ from 'lodash';

// icons



export default function CarouselMan(props) {

  const { content, ...rest } = props;

  const stylesCarousel = {
    root: {
      width: '100%',
      maxWidth: '100% !important',
      margin: '0 ',

    },

    viewport: {
      width: '80%',
      height: 'max-content',
    },

    indicator: {
      width: rem(8),
      height: rem(5),
      transition: 'width 250ms ease',
      background: 'gray',

      '&[data-active]': {
        width: rem(24),
        background: "#0074D9",
      },
    },

    indicators: {
      position: 'relative',
      bottom: 0,
      height: rem(5),
      gap: "3px",

    },

    control: {
      borderRadius: "10px",
      minHeight: "3rem",
      background: 'rgba(0, 0, 0, 0.1)',
    },

    controls: {
      width: "100%",
      position: "absolute",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 10px",
    },
  };

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: 'Eclectronic Science',
      tutor:
        "Samitha Rathnayake",
      image:
        'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Industrial Chemistry',
      tutor:
        "Charitha Dissanayake",
      image:
        'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
    },
    {
      title: 'Chalaka Rasayanaya',
      tutor:
        "Charitha Dissanayake",
      image:
        'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
  ];

  return (
    <Carousel
      mx="auto"
      withIndicators
      height={"90%"}
      styles={stylesCarousel}
      withControls="false"
      slideSize="90%"
      slideGap="md"
      initialSlide={0}
    >
      {console.log(content)}
      {
        content.map((card, index) => (
          <Carousel.Slide>
            <Flex
              key={index}
              height={"100%"}
              p="5px"
            >
              <Flex h="100%" w="100%" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap="5px" py="5px">
                <AspectRatio minW="100%" height="auto" ratio={16 / 9} overflow={"hidden"} borderRadius={"10px"}>
                  <Image src={card.thumbnail} alt="image" objectFit={"cover"} />
                </AspectRatio>
                <Flex w="100%" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap="0px" py="5px">
                  <Text fontSize={{ base: '0.8rem', md: '0.8rem', lg: '1.1rem' }} fontWeight={"bold"} fontStyle={"Roboto"} color={"#3f3f3f"}>
                    {card.title}
                  </Text>
                  <Text fontSize={{ base: '0.7rem', md: '0.7rem', lg: '0.8rem' }} fontStyle={"Roboto"} color={"gray.400"} fontWeight={600}>
                    {card.user.name}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Carousel.Slide>
        ))
      }
    </Carousel >
  );

}