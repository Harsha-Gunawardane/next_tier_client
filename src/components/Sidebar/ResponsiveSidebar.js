import { Drawer, DrawerBody, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import Sidebar from "./Sidebar";


const ResponsiveSidebar = ({ Options, minimized, setMinimized, full = true, hidden, setHidden, open, onOpening, close, ...rest }) => {

    return (
        <>
            <Sidebar Options={Options} minimized={minimized} setMinimized={setMinimized} hidden={hidden} setHidden={setHidden} display={{ base: "none", md: "flex", lg: "flex" }} onClose={null} {...rest} />
            <Drawer isOpen={open} placement="left" overFlow={"hidden"} p={0}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <Sidebar Options={Options} minimized={{ base: false, md: false, lg: false }} hidden={!hidden} setHidden={setHidden} onOpen={onOpening} onClose={close} display={{ base: "flex", md: "flex", lg: "flex" }} w="100%" h={"100%"} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );

}

export default ResponsiveSidebar;