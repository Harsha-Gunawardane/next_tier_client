import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";  
import Sidebar from "../components/Sidebar";

import { Flex } from "@chakra-ui/react";

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import {TiDocumentText} from 'react-icons/ti';

const SidebarAndHeader = ({}) => {
    const Options = [
        { icon: GridViewRoundedIcon, name: 'Dashboard', href: '/dashboard', active: true},
        { icon: TiDocumentText, name: 'Courses', href: '/courses'},
    ]

    //chakra ui layout for sidebar from components folder and header with an outlet for the children
    return (

        <Flex>
            <Sidebar Options={Options} minimized={true}/>
            {/* take the rest width */}
            <Flex direction={'column'} w={'calc(100vw - 260px)'} h={'100vh'} overflow={'hidden'}>
                <Header/>
                <Outlet/>
            </Flex>
        </Flex>
    )

}


export default SidebarAndHeader;