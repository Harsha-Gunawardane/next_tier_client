
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import MyTag from '../components/MyTag'

//icons
import { TbPinnedFilled } from "react-icons/tb"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function TutorCard(props) {

    const { tutor } = props;

    useEffect(() => {
        console.log(tutor);
    })

    const navigate = useNavigate();
    const navigateToTutorProfile = (id) => {
        navigate(`/stu/tutors/${id}`)
    }

    return (
        <Center >
            <Box
                maxW={'400px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'xl'}
                rounded={'md'}
                overflow={'hidden'}
                m={2}
            >
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit="cover"
                    alt="#"
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            tutor.user.profile_picture
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6} pt={3}>
                    <Stack spacing={0} align={'center'}>
                        <Heading
                            fontSize={'1.2rem'}
                            fontWeight={'bold'}
                            noOfLines={1}
                        >
                            Mr. {tutor.user.first_name} {tutor.user.last_name}
                        </Heading>
                        <Text
                            color={'gray.500'}
                            fontSize={'0.9rem'}
                            noOfLines={1}
                        >
                            {tutor.qualifications[0]}
                        </Text>
                    </Stack>

                    <Flex
                        mt={1}
                        sx={
                            {
                                '::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }
                        }
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Stack
                            direction={'row'}
                            spacing={2}
                            wrap={'wrap'}
                            justify={'center'}
                        >
                            {tutor.subjects.map((subject) => (
                                <MyTag tagLabel={subject} color={"green"} />
                            ))}
                            {tutor.medium.map((medium) => (
                                <MyTag tagLabel={medium + " Medium"} color={"orange"} />
                            ))}
                        </Stack>
                    </Flex>

                    <Stack direction={'row'} justify={'center'} spacing={6} mt={3}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{tutor._count.courses}</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Classes
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>{tutor._count.study_pack}</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                StudyPacks
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        w={'full'}
                        mt={5}
                        bg={useColorModeValue('accent', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                        onClick={() => navigateToTutorProfile(tutor.tutor_id)}
                    >
                        View Classes & StudyPacks
                    </Button>
                </Box>
            </Box>
        </Center >
    )
}
