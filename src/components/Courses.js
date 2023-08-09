import { useContext, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";
import { useOutletContext } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/media-query";

export default function Courses() {

    const { setSidebarOptionHandler } = useSidebar();
    const [minimizeButtonRef, minimized] = useOutletContext();
    const stateCheck = useBreakpointValue({
        md: minimized.md ? true : true,
        lg: minimized.lg ? true : true
    });


    useEffect(() => {
        setSidebarOptionHandler("courses")
    }, []);

    useEffect(() => {
        // console.log(stateCheck);
        // if (stateCheck.md || stateCheck.lg) {
        minimizeButtonRef.current.click()
        // }
    }, [])



    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
