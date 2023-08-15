import { Flex, Icon, Text, Image, IconButton, Center } from "@chakra-ui/react";
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
				width={minimizeStatus ? "max-content" : "160px"}
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
				color={active ? "primary" : "#7F7F7F"}>
				{/* <Box as='box'> */}
				<Flex alignItems={"center"} justifyContent={"center"} h="100%">
					{iconComponent && <Icon fontSize="24" as={iconComponent} />}
				</Flex>
				{/* </Box> */}
				<Flex
					//if minimized is true, then set display to none
					display={minimizeStatus && "none"}>
					<Text fontSize={"14px"}>{name}</Text>
				</Flex>
			</Flex>
		</Link >
	);
};

const Sidebar = ({ Options, minimized = false, full = true, setSidebarWidth, hidden, setHidden, ...rest }) => {
	useEffect(() => {
		const width = window.getComputedStyle(document.getElementById("Sidebar")).width;
		setSidebarWidth(width);
	}, [setSidebarWidth]);

	const { activeTab, handleTabClick } = useContext(SidebarContext);
	const [minimizedStatus, setMinimizedStatus] = useState(minimized);

	const settings = { icon: MdSettings, name: "Settings", value: "settings", href: "/stu/settings" };
	const logout = { icon: TbLogout, name: "Logout", href: "/logout" };

	// console.log(activeTab)

	return (
		<Flex
			id="Sidebar"
			h={full ? "100vh" : "calc(100% - 64px)"}
			w={minimizedStatus ? "max-content" : "260px"}
			bg="primary"
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"flex-start"}
			gap="10px"
			position={"sticky"}
			borderRight={"1px"}
			borderColor={"gray.100"}
			transition={"all 0.5s"}
			pos={"fixed"}
			zIndex={"1000"}
			onChange={setSidebarWidth()}
			display={hidden ? { base: "flex", lg: "flex" } : { base: "none", lg: "flex" }}
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
				<Flex justifyContent="center" alignItems={"center"} h="64px" display={minimizedStatus ? "none" : "flex"}>
					<Image
						h="36px"
						src="/logo.png"
						alt="logo"
					/>
				</Flex>
				<IconButton
					variant={"ghost"}
					margin={0}
					h="40px"
					minWidth="max-content"
					p="10px"
					onClick={() => {
						hidden ? setHidden(!hidden) : setMinimizedStatus(!minimizedStatus);
					}}>
					<FontAwesomeIcon icon={faBars} />
				</IconButton>
			</Flex>

			<Flex direction={"column"} w={"max-content"}>
				<Flex direction={"column"} w={"max-content"} alignItems={"center"} px={!minimizedStatus ? "30px" : "10px"} py={"30px"} gap="10px">
					{Options.map((option) => (
						<Option {...option} minimizeStatus={minimizedStatus ? true : false} active={activeTab == option.value ? true : false} />
					))}
				</Flex>

				<Flex direction={"column"} w={"max-content"} alignItems={"center"} px={!minimizedStatus ? "30px" : "10px"} py={"30px"} gap="10px" borderTop={"1px"} borderTopColor={`gray.100`}>
					<Option {...settings} minimizeStatus={minimizedStatus} />
					<Option {...logout} minimizeStatus={minimizedStatus} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Sidebar;
