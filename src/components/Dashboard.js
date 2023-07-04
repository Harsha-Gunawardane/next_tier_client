import { Box, ChakraProvider, ColorModeScript, Container, Flex, HStack, Heading, Image } from "@chakra-ui/react";
import theme from "../theme";
import Header from "./Header";
import ToggleColorMode from "./ToggleColorMode";


const Dashboard = () => {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Container maxW="container.xl" m='0' p='0'>
                <Header />  
            </Container>
        </ChakraProvider>
    )
}

export default Dashboard;

