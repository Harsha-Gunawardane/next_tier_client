import { SidebarContext } from "../context/SidebarContext";
import { useContext, useEffect } from "react";


export default function setSidebarOption(option) {
    const { activeTab, handleTabClick, handleSidebarToggle, setSidebarOption } = useContext(SidebarContext);

    useEffect(() => {
        setSidebarOption("content")
    });
}