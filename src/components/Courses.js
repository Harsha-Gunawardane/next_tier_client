import { useContext, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";

export default function Courses() {

    const { setSidebarOptionHandler } = useSidebar();

    useEffect(() => {
        setSidebarOptionHandler("courses")
    });

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
