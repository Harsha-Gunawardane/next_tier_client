import { Flex, Icon, Text, Image, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MdSettings } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const Option = ({ icon: iconComponent, name, href, active, minimizeStatus }) => {

	return (
		<Link to={href} _hover={"none"} >
			<Flex
				p="10px"
				borderRadius={"10px"}
				borderColor={"gray.800"}
				justifyContent={"flex-start"}
				width={{ base: "160px", md: minimizeStatus.md ? "44px" : "180px", lg: minimizeStatus.lg ? "44px" : "180px" }}
				minWidth={"max-content"}
				alignItems={"center"}
				background={"primary"}
				gap="10px"
				_hover={
					!active && {
						background: "gray.100",
						transition: "0.1s",
					}
				}
				//if active is true, then set background to gray.100
				bg={active && "accent"}
				color={active ? "primary" : "#7F7F7F"}
				boxShadow={active ? "0 0 8px 1px rgba(0, 0, 0, 0.1)" : "none"}
				transition={"all 0.5s ease"}
			>
				{/* <Box as='box'> */}
				<Flex alignItems={"center"} justifyContent={"center"} h="100%">
					{iconComponent && <Icon fontSize="24" as={iconComponent} />}
				</Flex>
				{/* </Box> */}
				<Flex
					//if minimized is true, then set display to none
					display={{ base: "flex", md: minimizeStatus.md ? "none" : "flex", lg: minimizeStatus.lg ? "none" : "flex" }}
					width={minimizeStatus.md || minimizeStatus.lg ? "0" : "max-content"}
					transition={"all 0.5s ease"}
				>
					<Text fontSize={"14px"}>{name}</Text>
				</Flex>
			</Flex>
		</Link >
	);
};

const Sidebar = ({ Options, minimized, setMinimized, full = true, setSidebarWidth, hidden, setHidden, onOpen, onClose, ...rest }) => {
	useEffect(() => {
		const width = window.getComputedStyle(document.getElementById("Sidebar")).width;
		console.log(width);
		setSidebarWidth(width);
	}, [setSidebarWidth]);

	const { activeTab, handleTabClick } = useContext(SidebarContext);

	const handleMinimizing = () => {
		if (onClose) {
			onClose();
		}
		else {
			const status = {
				base: minimized.base ? false : false,
				md: minimized.md ? false : true,
				lg: minimized.lg ? false : true,
			}
			setMinimized(status);
			const width = window.getComputedStyle(document.getElementById("Sidebar")).width;
			setSidebarWidth(width);
		}
	};



	const settings = { icon: MdSettings, name: "Settings", value: "settings", href: "/stu/settings" };
	const logout = { icon: TbLogout, name: "Logout", href: "/logout" };

	// console.log(activeTab)

	return (
		<Flex
			id="Sidebar"
			h={full ? "100vh" : "calc(100% - 64px)"}
			w={{ base: "260px", md: minimized.md ? "64px" : "260px", lg: minimized.lg ? "64px" : "260px" }}
			maxW={"260px"}
			minW={"64px"}
			bg="primary"
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"flex-start"}
			gap="10px"
			position={"sticky"}
			// borderRight={"1px"}
			// borderColor={"gray.100"}
			transition={"all 0.5s ease"}
			zIndex={"1000"}
			// onChange={setSidebarWidth()}
			{...rest}>
			<Flex
				p={"4px"}
				h={"64px"}
				w={"max-content"}
				alignItems={"center"}
				justifyContent={"space-between"}
				gap="60px"
				//if not full is true, then set display to none
				display={full ? "flex" : "none"}>
				<Flex
					justifyContent="center"
					alignItems={"center"} h="64px"
					display={{ base: "flex", md: minimized.md ? "none" : "flex", lg: minimized.lg ? "none" : "flex" }}
					// opacity={minimized.md || minimized.lg ? 0 : 1}
					transition={"all 0.5s ease"}
				>
					<Image
						h="36px"
						src="/logo.png"
						alt="logo"
						// opacity={minimized.md || minimized.lg ? 0 : 1}
						transition={"all 0.5s ease"}
					/>
				</Flex>
				<IconButton
					variant={"ghost"}
					margin={0}
					h="40px"
					minWidth="max-content"
					p="10px"
					onClick={() => handleMinimizing()}
				>
					<FontAwesomeIcon icon={faBars} />
				</IconButton>
			</Flex>

			<Flex direction={"column"} w={"max-content"}>
				<Flex direction={"column"} w={"max-content"} alignItems={"center"} px={!minimized ? "30px" : "10px"} py={"30px"} gap="10px">
					{Options.map((option) => (
						<Option {...option} minimizeStatus={{ base: false, md: minimized.md ? true : false, lg: minimized.lg ? true : false }} active={activeTab == option.value ? true : false} />
					))}
				</Flex>

				<Flex direction={"column"} w={"max-content"} alignItems={"center"} px={!minimized ? "30px" : "10px"} py={"30px"} gap="10px" borderTop={"1px"} borderTopColor={`gray.100`}>
					<Option {...settings} minimizeStatus={minimized} />
					<Option {...logout} minimizeStatus={minimized} />
				</Flex>
			</Flex>
		</Flex >
	);
};

export default Sidebar;
