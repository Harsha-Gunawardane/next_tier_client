import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SidebarContext = createContext();

const determineDefaultTab = (pathname) => {
	// Determine the default active tab based on the current route or other criteria
	const defaultTab = pathname.split("/")[2];
	console.log(defaultTab);

	return defaultTab;
};

const SidebarProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState("");
	const [sidebarMinimized, setSidebarMinimized] = useState(false);
	const [hidden, setHidden] = useState(false);

	// const location = useLocation();

	// useEffect(() => {
	// 	const defaultTab = determineDefaultTab(location.pathname);
	// 	const defaultTab = "dashboard";

	// 	setActiveTab(defaultTab);
	// }, [location]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const setSidebarOption = (activeOption) => {
		setActiveTab(activeOption);
	};

	const handleSidebarToggle = () => {
		setSidebarMinimized(!sidebarMinimized);
	};

	return <SidebarContext.Provider value={{ activeTab, handleTabClick, handleSidebarToggle, sidebarMinimized, setSidebarOption, hidden, setHidden }}>{children}</SidebarContext.Provider>;
};

export { SidebarContext, SidebarProvider };
