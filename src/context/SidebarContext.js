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
	const location = useLocation();

	useEffect(() => {
		const defaultTab = determineDefaultTab(location.pathname);

		setActiveTab(defaultTab);
	}, [location]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return <SidebarContext.Provider value={{ activeTab, handleTabClick }}>{children}</SidebarContext.Provider>;
};

export { SidebarContext, SidebarProvider };
