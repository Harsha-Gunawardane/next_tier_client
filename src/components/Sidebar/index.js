import { Box, Flex, Icon, Link, Text, background } from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';

const Option = ({icon:iconComponent, name, href, active, minimized}) => {
    return (
        <Link href={href} _hover={'none'}>
            <Flex 
                p="10px" 
                borderRadius={'10px'} 
                borderColor={'gray.800'} 
                justifyContent={'flex-start'} 
                width={minimized ? 'max-content' : '200px'}  
                alignItems={'center'} 
                background={'primary'} 
                gap="10px"
                _hover={!active &&{  

                    background: 'gray.100',
                    transition: '0.1s',

                }}
                //if active is true, then set background to gray.100
                bg={active && 'accent'}
                color={active && 'primary'}
                
                >
                
                <Box as='box' w={'25px'} h={'25px'}>
                    <Flex 
                        alignItems={'center'} 
                        justifyContent={'center'} 
                        h="100%"
                    >
                        {iconComponent && (
                            <Icon
                                fontSize="24"
                                as={iconComponent}
                            />
                        )}
                    </Flex>
                </Box>
                <Flex
                    //if minimized is true, then set display to none
                    display={minimized && 'none'}
                >
                    <Text fontSize={'16px'}>{name}</Text> 
                </Flex>
            </Flex>
        </Link>
    )
}


const Sidebar = ({Options, minimized}) => {

    return (
        <Flex 
            as="Sidebar" 
            h='calc(100% - 64px)' 
            w={minimized ? 'max-content' : '260px'} 
            bg='gray.100' 
            flexDirection={'column'} 
            alignItems={'center'} 
            gap="10px" 
            pt='10px'
            pr={'5px'}
            pl={'5px'} 
            position={'sticky'}>
                {Options.map((option) => (
                    <Option 
                        key={option.name} 
                        name={option.name} 
                        icon={option.icon}  
                        minimized ={minimized ? true : false}
                    />
                ))}

        </Flex>
    )

}

export default Sidebar;