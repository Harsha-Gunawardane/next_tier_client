import { SidebarContext } from "../context/SidebarContext";
import { useContext, useEffect } from "react";

const Content = () => {
    const { activeTab, handleTabClick, handleSidebarToggle, setSidebarOption } = useContext(SidebarContext);

    useEffect(() => {
        setSidebarOption("content")
    });

    return (
        <div>
            <h1>Content</h1>
        </div>
    )
}

export default Content