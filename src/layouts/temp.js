// <SidebarProvider>
		// <Box
		// 	h="100vh"
		// 	w="100vw"
		// 	overflowX={"hidden"}
		// 	overflowY={"auto"}
		// >
		// 	{/* <Sidebar Options={Options} minimized={{ base: false, md: true, lg: false }} setSidebarWidth={setSidebarWidth} hidden={hidden} setHidden={setHidden} /> */}
		// 	<ResponsiveSidebar Options={Options} minimized={minimized} setMinimized={setMinimized} hidden={hidden} setHidden={setHidden} open={isOpen} onOpening={onOpen} close={onClose} position={"fixed"} />

		// 	<Box
		// 		ml={{ base: "0", md: minimized.md ? "64px" : "260px", lg: minimized.lg ? "64px" : "260px" }}
		// 		w={{ base: "100vw", md: minimized.md ? "calc(100% - 72px)" : "calc(100% - 268px)", lg: minimized.lg ? "calc(100% - 72px)" : "calc(100% - 268px)" }}
		// 		h={"100vh"}
		// 		transition={"all 0.5s ease"}
		// 	>
		// 		{/* <Header w={{ base: "100%", lg: "calc(100% - " + sidebarWidth + ")" }} hidden={hidden} setHidden={setHidden} /> */}
		// 		<Header
		// 			w={{ base: "100vw", md: minimized.md ? "calc(100vw - 72px)" : "calc(100vw - 268px)", lg: minimized.lg ? "calc(100vw - 72px)" : "calc(100vw - 268px)" }}
		// 			hidden={hidden}
		// 			setHidden={setHidden}
		// 			right={0}
		// 			onOpen={onOpen}
		// 			transition={"width 0.5s ease"}
		// 			minimized={minimized}
		// 			setMinimized={setMinimized}
		// 			position={"fixed"}
		// 			mr={"8px"}
		// 		/>
		// 		<Flex
		// 			pt={"64px"}
		// 		>
		// 			<Outlet />
		// 		</Flex>
		// 	</Box>
		// </Box>