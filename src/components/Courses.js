import { useContext, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";
import { useOutletContext } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/media-query";

export default function Courses() {

    const { setSidebarOptionHandler } = useSidebar();

    // useEffect(() => {
    setSidebarOptionHandler("courses")
    // });

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
