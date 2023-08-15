import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Title, useMantineTheme, rem } from '@mantine/core';


import {
    Box,
    GridItem,
    SimpleGrid,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    AspectRatio,
    Image,
    Tag,
    Avatar,
    Flex,
    Text,
    Button
} from "@chakra-ui/react"
import countToString from '../../../../utils/countToString';
import generateTimeAgoString from '../../../../utils/timesAgo';

const useStyles = createStyles((theme) => ({
    card: {
        height: rem(440),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: rem(32),
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));


function Card({ videoDetails }) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{
                // backgroundImage: `url(${image})` 
                backgroundImage: `
                                    linear-gradient(to right, rgba(255, 255, 255, 0),rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 1)), 
                                    url(${videoDetails.thumbnail})
                                    `,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
            }}
            h={"100%"}
        >
            <Flex w="100%" justifyContent={"space-between"} alignItems={"flex-start"} mt="5px" direction={"row"}>
                <Box w="60%">
                </Box>
                <Flex w="40%" direction={"column"} gap="10px">
                    <Flex gap={"10px"} direction={"column"} w="100%">
                        <Text noOfLines={2} fontSize={"18px"} fontWeight={"bold"} color={"#3f3f3f"}>{videoDetails.title}</Text>
                    </Flex>
                    <SimpleGrid gap="5px" position={"relative"} columns={12} templateColumns={"max-content repeat(11, 1fr)"} mt="5px" >
                        <GridItem colSpan={1} w="max-content">
                            <Avatar h="24px" w="24px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" mt="5px" />
                        </GridItem>
                        <GridItem colSpan={11} px="5px">
                            <Flex w="100%" justifyContent={"center"} alignItems={"flex-start"} mt="5px" direction={"column"}>
                                <Flex color={"gray.600"}>
                                    <Text fontSize={"14px"} fontWeight={""} >{videoDetails.user.name}</Text>
                                </Flex>
                            </Flex>
                        </GridItem>
                    </SimpleGrid>
                    <Flex gap={"5px"} color={"gray.600"}>
                        <Text fontSize={"12px"} fontWeight={"semibold"} >{countToString(videoDetails._count.content_views)} views</Text>
                        <Text fontSize={"12px"} fontWeight={"semibold"} >•</Text>
                        <Text fontSize={"12px"} fontWeight={"semibold"} >{generateTimeAgoString(videoDetails.uploaded_at)}</Text>
                    </Flex>
                    <Button variant="outline" size="sm" mt="5px" w="max-content" colorScheme="blue">
                        Start watching
                    </Button>
                </Flex>
            </Flex >

        </Paper >
    );
}

// const data = [
//     {
//         image:
//             'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Best forests to visit in North America',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Hawaii beaches review: better than you think',
//         category: 'beach',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Mountains at night: 12 best locations to enjoy the view',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Aurora in Norway: when to visit for best experience',
//         category: 'nature',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Best places to visit this winter',
//         category: 'tourism',
//     },
//     {
//         image:
//             'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
//         title: 'Active volcanos reviews: travel at your own risk',
//         category: 'nature',
//     },
// ];

const CardsCarousel = (props) => {
    const { videoList } = props;

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = videoList.map((item) => (
        <Carousel.Slide key={item.id}>
            <Card videoDetails={item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize="100%"
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 1}
            h={"100%"}
            styles={(theme) => ({
                viewport: {
                    height: "100%"
                },
                container: {
                    height: "100%"
                }
            })}
        >
            {slides}
        </Carousel >
    );
}


export default CardsCarousel;