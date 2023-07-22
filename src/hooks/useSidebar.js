import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

const useSidebar = () => {
    const { setSidebarOption, hidden, setHidden } = useContext(SidebarContext);

    const toggleSidebar = () => {
        setHidden(!hidden);
    }

    const setSidebarOptionHandler = (option) => {
        setSidebarOption(option);
    }

    return { toggleSidebar, setSidebarOptionHandler };
}

export default useSidebar;