import { SidebarContext } from "../context/SidebarContext";
import { useContext, useEffect } from "react";

export default function Courses() {

    const { activeTab, handleTabClick, handleSidebarToggle, setSidebarOption } = useContext(SidebarContext);

    useEffect(() => {
        setSidebarOption("courses")
    });

    return (
        <div>
            <h1>Courses</h1>
        </div>
    )
}
