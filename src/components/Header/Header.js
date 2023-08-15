import { Box, Flex, Text, Image, Avatar, IconButton, Button, FormControl, InputGroup, InputLeftElement, Input, Spacer } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
// import ToggleColorMode from "../ToggleColorMode";
// import { SidebarContext } from "../../context/SidebarContext";


//icons
import { HiSearch } from "react-icons/hi";
import { PiBell, PiBellFill } from "react-icons/pi";
import { BiMenuAltLeft } from "react-icons/bi";

//images
import logo_icon from "../../assests/logos/png/logo_icon.png";
import logo_text from "../../assests/logos/png/logo_text.png";

//backend api
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useUserInfo } from "../../store/user/useUserInfo";

//back end api end points
const USER_INFO_URL = "/user/info";



const Header = ({ full = false, hidden, setHidden, onOpen, minimized, setMinimized, ...rest }) => {

	const axiosPrivate = useAxiosPrivate();
	const { fName, lName, userRole, setFName, setLName, setUserRole } = useUserInfo();

	useEffect(() => {
		const getUserInfo = async () => {
			let isMounted = true;
			const controller = new AbortController();

			try {
				const response = await axiosPrivate.get(`${USER_INFO_URL}`, {
					signal: controller.signal,
				});

				const userInfo = response.data;

				if (isMounted) {

					setFName(userInfo.fName);
					setLName(userInfo.lName);

					console.log(userInfo.fName);

					let keyNotUser;
					for (const key in userInfo.userRole) {
						if (key !== "User") {
							keyNotUser = key;
							break;
						}
					}
					setUserRole(keyNotUser);
				}


			} catch (err) {
				console.log(err);
			}
		};

		getUserInfo();
	}, []);



	return (
		<Flex h="64px" bg="white" justifyContent={"space-between"} alignItems={"center"} zIndex={2} position={"absolute"}
			{...rest}
		>
			<Flex h="100%" justifyContent={"space-between"}>
				<Flex
					p={"4px"}
					h={"100%"}
					alignItems={"center"}
					justifyContent={"space-between"}
					px="10px"
					gap="5px"
					//if full is true, then set display to none
					display={{ base: "none", md: minimized ? "flex" : "none", lg: minimized ? "flex" : "none" }}
				>
					<IconButton
						variant={"ghost"}
						margin={0}
						h="40px"
						minWidth="max-content"
						p="10px"
						display={{ base: "flex", md: minimized.md ? "flex" : "none", lg: minimized.lg ? "flex" : "none" }}
						onClick={() => {
							setMinimized({ base: false, md: !minimized.md, lg: !minimized.lg });
						}}
					>
						<BiMenuAltLeft size={"24px"} />
					</IconButton>
				</Flex>
				<Flex
					p={"4px"}
					h={"100%"}
					alignItems={"center"}
					justifyContent={"space-between"}
					px="10px"
					gap="5px"
					//if full is true, then set display to none
					display={{ base: "flex", md: full ? "flex" : "none", lg: full ? "flex" : "none" }}
				>
					<Image h="36px" src={logo_icon} alt="logo" />
					<IconButton
						variant={"ghost"}
						margin={0}
						h="40px"
						minWidth="max-content"
						p="10px"
						display={{ base: "flex", md: minimized ? "flex" : "none", lg: minimized ? "flex" : "none" }}
						onClick={() => {
							onOpen()
						}}
					>
						<BiMenuAltLeft size={"24px"} />
					</IconButton>
				</Flex>
				{/* <Flex h={"100%"} alignItems={"center"} justifyContent={"center"} display={{ base: "flex", md: "none", lg: "none" }}>
					<Image h="36px" src={logo_text} alt="logo" />
				</Flex> */}
				<Flex alignItems={"Center"}>
					<FormControl id="search" h="56px" justifyContent={"center"} alignItems={"center"} display={"none"}>
						<InputGroup borderColor="#E0E1E7" h={"100%"}>
							<InputLeftElement pointerEvents="none" children={<HiSearch h="30px" color="gray.100" />} h={"max-content"} w={"max-content"} p="5px" />
							<Input variant="filled" placeholder="Search" size="lg" borderRadius={"2px"} />
						</InputGroup>
					</FormControl>
				</Flex>
			</Flex>

			<Flex p={"4px"} h={"100%"} alignContent={"center"} alignItems={"center"} gap={{ base: "10px", md: "18px", lg: "36px" }}>
				{/* <Flex>
                    <ToggleColorMode />
                </Flex> */}
				<Flex>
					<BellIcon />
				</Flex>
				<Flex p={"4px"} pr={"10px"} h={"100%"} alignContent={"center"} alignItems={"center"} gap={"10px"}>
					<Box h={"40px"} textAlign={"right"} display={{ base: "none", lg: "block" }} >
						<Text fontSize={"16px"} fontWeight={"bold"} fontStyle={"Roboto"}>
							{`${fName} ${lName}`}
						</Text>
						<Text fontSize={"10px"} fontWeight={"semibold"} color={"gray.400"} fontStyle={"Roboto"}>
							{`${userRole}`}
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
