import { Box, ChakraProvider, ColorModeScript, Container, Flex, HStack, Heading, Image } from "@chakra-ui/react";
import theme from "../theme";
import ToggleColorMode from "./ToggleColorMode";


const Dashboard = () => {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Container maxW="container.xl" p="0">
                <Flex as="header" h="64px" alignItems="center" justifyContent="space-between" borderBottom="1px" borderColor="gray.200" px="4px">  
                    <HStack alignItems="center">
                        <Image h="48px" src="/logo-icon.png" alt="logo" />
                        <Image h="40px" src="/logo.svg" alt="logo"/>
                    </HStack>
                </Flex>   
            </Container>
        </ChakraProvider>
    )
}

export default Dashboard;

