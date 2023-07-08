import { Container} from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import {TiDocumentText} from 'react-icons/ti';


const Dashboard = () => {

    const Options = [
        { icon: GridViewRoundedIcon, name: 'Dashboard', href: '/dashboard'},
        { icon: TiDocumentText, name: 'Courses', href: '/courses'},
    ]

    return (
            <Container maxW="container.xl" m='0' p='0'>
                <Header /> 
                <Sidebar Options={Options} /> 
            </Container>
    )
}

export default Dashboard;

