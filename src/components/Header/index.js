import { Box, Flex, HStack, Heading,Text, Image, Avatar, Button, FormControl,InputGroup,InputLeftElement,Input } from "@chakra-ui/react";
//icons
import  {FaBars} from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs';
import { HiSearch } from 'react-icons/hi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ToggleColorMode from "../ToggleColorMode";


const Header = () => {
    return (
        <Flex as={'header'} h='64px' bg="white" w="100vw" justifyContent={"space-between"} alignItems={"center"} borderBottom="1px" borderColor="gray.100" px="4px">
            <Flex h='100%' alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
                <Flex p={'4px'} h={"100%"} w={"320px"} alignContent={"center"} alignItems={'center'} justifyContent={'space-between'} px="24px">
                    <Image h="36px" src="/logo.png" alt="logo" />
                    <Button variant="ghost"  size="sm" margin={0}>
                        <FontAwesomeIcon icon={faBars} />   
                    </Button>
                </Flex>
                <FormControl as={'searchbar'} id="name" h="40px" justifyContent={'center'} alignItems={'center'}>
                    <InputGroup borderColor="#E0E1E7" h={'40px'}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<HiSearch h="30px" color="gray.100" />}
                            h={'max-content'}
                            w={'max-content'}
                            p='5px'
                        />
                        <Input variant='filled' placeholder='Search'   size='xs' borderRadius={'10px'}/>
                    </InputGroup>
                </FormControl>
            </Flex>
            <Flex p={'4px'} pr={'10px'} h={"100%"} alignContent={'center'} alignItems={'center'} gap={'36px'}>
                {/* <Flex>
                    <ToggleColorMode />
                </Flex> */}
                <Flex>
                    <Button variant="ghost"  size="sm" margin={0}>
                        <NotificationsNoneOutlinedIcon fontSize="small" />
                    </Button>
                </Flex>
                <Flex as='profile' p={'4px'} pr={'10px'} h={"100%"} alignContent={'center'} alignItems={'center'} gap={'16px'}>
                    <Box  h={"40px"} textAlign={'right'}>
                        <Text fontSize={'16px'} fontWeight={'bold'} > Nipuna Rahal</Text>
                        <Text fontSize={'10px'} fontWeight={500} color={"gray.400"}> Student</Text>
                    </Box>
                    <Avatar h="48px" w="48px" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                </Flex>
            </Flex>
        </Flex>
    )
}


export default Header;