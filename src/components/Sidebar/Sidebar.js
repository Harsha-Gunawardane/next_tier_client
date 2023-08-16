import { Flex, Icon, Text, Image, IconButton, useBreakpointValue, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MdSettings } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { motion } from "framer-motion";

//images
import logo_icon from "../../assests/logos/png/logo_icon.png";
import logo_text from "../../assests/logos/png/logo_text.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";



const Option = ({ icon: iconComponent, name, href, active, minimizeStatus }) => {

	//animation
	const show = {
		opacity: 1,
		display: "flex"
	};

	const hide = {
		opacity: 0,
		transitionEnd: {
			display: "none"
		}
	};

	const animations = useBreakpointValue({
		md: minimizeStatus.md ? hide : show,
		lg: minimizeStatus.lg ? hide : show
	});


	return (
		<Link to={href} _hover={"none"} >
			<Flex
				p="10px"
				borderRadius={"10px"}
				borderColor={"gray.800"}
				justifyContent={"flex-start"}
				width={{ base: "180px", md: minimizeStatus.md ? "44px" : "180px", lg: minimizeStatus.lg ? "44px" : "180px" }}
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
				bg={active && "accent"}
				color={active ? "primary" : "#7F7F7F"}
				boxShadow={active ? "0 0 8px 1px rgba(0, 0, 0, 0.1)" : "none"}
				transition={"all 0.5s ease"}
			>
				<Flex alignItems={"center"} justifyContent={"center"} h="100%">
					{iconComponent && <Icon fontSize="24" as={iconComponent} />}
				</Flex>
				<Flex
					as={motion.div}
					// display={{ base: "flex", md: minimizeStatus.md ? "none" : "flex", lg: minimizeStatus.lg ? "none" : "flex" }}
					width={minimizeStatus.md || minimizeStatus.lg ? "0" : "max-content"}
					// transition={"all 0.5s ease"}
					animate={animations}
					transition={{ duration: 0.5 }}
				>
					<Text fontSize={"14px"}>{name}</Text>
				</Flex>
			</Flex>
		</Link >
	);
};

const Sidebar = (props) => {

	const {
		Options,
		minimized,
		setMinimized,
		full = true,
		hidden,
		setHidden,
		onOpen,
		onClose,
		minimizeButtonRef,
		...rest
	} = props;

	const { activeTab } = useContext(SidebarContext);

	//animation
	const show = {
		opacity: 1,
		// scale: 1,
		display: "flex"
	};

	const hide = {
		opacity: 0,
		// scale: 0,
		transitionEnd: {
			display: "none"
		}
	};

	const animations = useBreakpointValue({
		md: minimized.md ? hide : show,
		lg: minimized.lg ? hide : show
	});

	const handleMinimizing = () => {
		if (onClose) {
			onClose();
		}
		else {
			const status = {
				base: minimized.base ? false : false,
				md: minimized.md ? true : true,
				lg: minimized.lg ? true : true,
			}
			setMinimized((prev) => {
				const newStatus = {
					base: prev.base ? false : false,
					md: prev.md ? true : true,
					lg: prev.lg ? true : true,
				}
				return newStatus;
			});
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
			transition={"all 0.5s ease"}
			zIndex={"1000"}
			{...rest}>
			<Flex
				p={"10px"}
				h={"64px"}
				width={{ base: "260px", md: minimized.md ? "64px" : "260px", lg: minimized.lg ? "64px" : "260px" }}
				alignItems={"center"}
				justifyContent={"flex-start"}
				transition={"all 0.5s ease"}
				display={full ? "flex" : "none"}>

				<Flex
					justifyContent={"flex-start"}
					alignItems={"center"}
					h="64px"
					gap="4px"
				>
					<Image
						h="44px"
						src={logo_icon}
						alt="logo"
						maxW={"none"}

					/>
					<Image
						as={motion.img}
						h="24px"
						src={logo_text}
						alt="logo"
						maxW={"none"}
						// display={{ base: "flex", md: minimized.md ? "none" : "flex", lg: minimized.lg ? "none" : "flex" }}
						animate={animations}
						transition={{ duration: 0.5 }}

					/>
				</Flex>
				<Spacer />
				<IconButton
					as={motion.div}
					ref={minimizeButtonRef}
					variant={"outline"}
					onClick={() => handleMinimizing()}
					// display={{ base: "flex", md: minimized.md ? "none" : "flex", lg: minimized.lg ? "none" : "flex" }}
					animate={animations}
					transition={{ duration: 0.5 }}
					borderRadius={"50%"}
					size={"sm"}
					color="gray.500"
					icon={<MdOutlineKeyboardArrowLeft size={"23px"} />}
				>
				</IconButton>
			</Flex>

			<Flex direction={"column"} w={"max-content"}>
				<Flex direction={"column"} w={"max-content"} alignItems={"center"} px={!minimized ? "30px" : "10px"} py={"30px"} gap="10px">
					{Options.map((option, index) => (
						<Option key={index} {...option} minimizeStatus={{ base: false, md: minimized.md ? true : false, lg: minimized.lg ? true : false }} active={activeTab === option.value ? true : false} />
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
