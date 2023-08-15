import { useContext, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";
import { useOutletContext } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/media-query";

export default function Courses() {

    const [minimizeButtonRef] = useOutletContext();

    useEffect(() => {
        minimizeButtonRef.current.click()
    }, [])

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
