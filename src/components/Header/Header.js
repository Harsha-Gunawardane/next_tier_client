import { Box, Flex, Text, Image, Avatar, IconButton, Button, FormControl, InputGroup, InputLeftElement, Input, Spacer } from "@chakra-ui/react";
//icons
import { HiSearch } from "react-icons/hi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { PiBell, PiBellFill } from "react-icons/pi";
import { BiMenuAltLeft } from "react-icons/bi";
import { icon } from "@fortawesome/fontawesome-svg-core";
// import ToggleColorMode from "../ToggleColorMode";

// import { SidebarContext } from "../../context/SidebarContext";
import { useContext, useEffect } from "react";

const Header = ({ full = false, hidden, setHidden, onOpen, ...rest }) => {

	useEffect(() => {
		console.log("header rendered")
	}, []);



	return (
		<Flex h="64px" bg="white" justifyContent={"space-between"} alignItems={"center"} zIndex={2} position={"fixed"} {...rest} >
			<Flex h="100%" justifyContent={"space-between"}>
				<Flex
					p={"4px"}
					h={"100%"}
					alignItems={"center"}
					justifyContent={"space-between"}
					px="10px"
					gap="10px"
				//if full is true, then set display to none
				// display={!full && "none"}
				>
					{/* <Image h="36px" src="/logo.png" alt="logo" /> */}
					<IconButton
						variant={"ghost"}
						margin={0}
						h="40px"
						minWidth="max-content"
						p="10px"
						display={{ base: "flex", lg: "none" }}
						onClick={() => {
							// setHidden(!hidden);
							onOpen()
							console.log("clicked")
						}}
					>
						<BiMenuAltLeft size={"24px"} />
					</IconButton>
				</Flex>
				<Flex alignItems={"Center"}>
					<FormControl id="search" h="56px" justifyContent={"center"} alignItems={"center"} display={"none"}>
						<InputGroup borderColor="#E0E1E7" h={"100%"}>
							<InputLeftElement pointerEvents="none" children={<HiSearch h="30px" color="gray.100" />} h={"max-content"} w={"max-content"} p="5px" />
							<Input variant="filled" placeholder="Search" size="lg" borderRadius={"2px"} />
						</InputGroup>
					</FormControl>
				</Flex>
			</Flex>
			<Flex p={"4px"} pr={"10px"} h={"100%"} alignContent={"center"} alignItems={"center"} gap={"36px"}>
				{/* <Flex>
                    <ToggleColorMode />
                </Flex> */}
				<Flex>
					<BellIcon />
				</Flex>
				<Flex p={"4px"} pr={"10px"} h={"100%"} alignContent={"center"} alignItems={"center"} gap={"10px"}>
					<Box h={"40px"} textAlign={"right"} display={{ base: "none", lg: "block" }} >
						<Text fontSize={"16px"} fontWeight={"bold"}>
							Nipuna Rahal
						</Text>
						<Text fontSize={"10px"} fontWeight={"semibold"} color={"gray.400"}>
							Student
						</Text>
					</Box>
					<Avatar h="48px" w="48px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
				</Flex>
			</Flex>
		</Flex>
	);
};


const BellIcon = () => {
	return (

		<Flex pos="relative" h="40px" w="40px" justifyContent="center" alignItems="center" >
			<IconButton
				icon={< PiBell size="24px" />}
				size="sm"
				margin={0}
				bg="transparent"
				_hover={{
					bg: "transparent",
					// icon: <PiBellFill size="24px" />
				}}
				_active={{
					bg: "transparent",
					// icon: <PiBellFill size="24px" />
				}}
			/>
			<Flex position="absolute" top="2" right="2" h="10px" w="10px" bg="red" borderRadius="50%" />

		</Flex>
	);
}

export default Header;
