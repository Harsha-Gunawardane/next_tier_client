import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Heading,
  Image,
  Flex,
  AspectRatio,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assests/css/carousel.css"

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <BiRightArrowAlt />,
  prevArrow: <BiLeftArrowAlt />,
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState({ Slider });

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '1%', md: '1%' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: 'Eclectronics',
      text:
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
    {
      title: 'Industrial Chemistry',
      text:
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
    },
    {
      title: 'Chalaka Rasayanaya',
      text:
        "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    },
  ];

  return (
    <Flex
      height={'100%'}
      width={'100%'}
      overflow={'hidden'}
      justifyContent={"center"}
      alignItems={"center"}
    >

      {/* Left Icon */}
      <Flex h="full" justifyContent="center" alignItems="center" w="10%">
        <IconButton
          w={"20px"}
          aria-label="left-arrow"
          variant="outline"
          // position="absolute"
          // left={side}
          // top={top}
          // transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}>
          <MdOutlineKeyboardArrowLeft size="20px" />
        </IconButton>
      </Flex>




      {/* Slider */}
      <Box justifyContent="center" alignItems="center" w="80%" h="100%" >
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height={'100%'}
            >
              {/* This is the block you need to change, to customize the caption */}
              <Flex h="100%" w="100%" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap="10px">
                <AspectRatio minW="100%" ratio={16 / 9} overflow={"hidden"} borderRadius={"10px"}>
                  <Image src={card.image} alt="image" objectFit={"cover"} />
                </AspectRatio>
                <Heading fontSize={{ base: '0.8rem', md: '0.8rem', lg: '1rem' }} fontStyle={"Roboto"}>
                  {card.title}
                </Heading>
              </Flex>
            </Box>
          ))
          }
        </Slider >
      </Box >

      {/* Right Icon */}
      <Flex h="100%" justifyContent="center" alignItems="center" w="10%">

        <IconButton
          aria-label="right-arrow"
          variant="outline"
          // position="absolute"
          // right={side}
          // top={top}
          // transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}>
          <MdOutlineKeyboardArrowRight size="20px" />
        </IconButton>
      </Flex>
    </Flex >
  );
}