import {
  Flex,
  Icon,
  Text,
  Image,
  IconButton,
  useBreakpointValue,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { BsInfoCircle } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { motion } from "framer-motion";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//images
import logo_icon from "../../assests/logos/png/logo_icon.png";
import logo_text from "../../assests/logos/png/logo_text.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";

const USER_SYS_FEEDBACK_URL = "/user/sys/feedback";

const Option = (props) => {
  const { icon: iconComponent, name, href, active, minimizeStatus } = props;

  //animation
  const show = {
    opacity: 1,
    display: "flex",
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  const animations = useBreakpointValue({
    md: minimizeStatus.md ? hide : show,
    lg: minimizeStatus.lg ? hide : show,
  });

  return (
    <Link to={href} _hover={"none"}>
      <Flex
        p="10px"
        borderRadius={"10px"}
        borderColor={"gray.800"}
        justifyContent={"flex-start"}
        width={{
          base: "180px",
          md: minimizeStatus.md ? "44px" : "180px",
          lg: minimizeStatus.lg ? "44px" : "180px",
        }}
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
          {iconComponent && <Icon fontSize="22" as={iconComponent} />}
        </Flex>
        <Flex
          as={motion.div}
          width={
            minimizeStatus.md || minimizeStatus.lg
              ? "0"
              : "--webkit-fill-available"
          }
          animate={animations}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize={"14px"}>{name}</Text>
        </Flex>
      </Flex>
    </Link>
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
    display: "flex",
  };

  const hide = {
    opacity: 0,
    // scale: 0,
    transitionEnd: {
      display: "none",
    },
  };

  const animations = useBreakpointValue({
    md: minimized.md ? hide : show,
    lg: minimized.lg ? hide : show,
  });

  const settings = {
    icon: MdSettings,
    name: "Settings",
    value: "settings",
    href: "/stu/settings",
  };

  const feedbackOption = {
    icon: BsInfoCircle,
    name: "Send Feedback",
    value: "feedback",
  };

  const logout = { icon: TbLogout, name: "Logout", href: "/logout" };
  const handleMinimizing = () => {
    if (onClose) {
      onClose();
    } else {
      setMinimized((prev) => {
        const newStatus = {
          base: prev.base ? false : false,
          md: prev.md ? true : true,
          lg: prev.lg ? true : true,
        };
        return newStatus;
      });
    }
  };

  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const { onClose: handlePopoverClose } = useDisclosure();

  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleFeedback = async () => {
    if (feedback.length >= 8) {
      try {
        const response = await axiosPrivate.post(USER_SYS_FEEDBACK_URL, {
          message: feedback,
        });

        console.log(response);
        setFeedback("");

        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log(feedbackError);
    if (feedback.length <= 8)
      setFeedbackError("Please provide detailed feedback");
    else setFeedbackError("");
  }, [feedback]);

  return (
    <Flex
      id="Sidebar"
      h={full ? "100vh" : "calc(100% - 64px)"}
      w={{
        base: "260px",
        md: minimized.md ? "64px" : "260px",
        lg: minimized.lg ? "64px" : "260px",
      }}
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
      {...rest}
    >
      <Flex
        p={"10px"}
        h={"64px"}
        width={{
          base: "260px",
          md: minimized.md ? "64px" : "260px",
          lg: minimized.lg ? "64px" : "260px",
        }}
        alignItems={"center"}
        justifyContent={"flex-start"}
        transition={"all 0.5s ease"}
        display={full ? "flex" : "none"}
      >
        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          h="64px"
          gap="4px"
        >
          <Image h="44px" src={logo_icon} alt="logo" maxW={"none"} />
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
        ></IconButton>
      </Flex>

      <Flex direction={"column"} w={"max-content"}>
        <Flex
          direction={"column"}
          w={"max-content"}
          alignItems={"center"}
          px={!minimized ? "30px" : "10px"}
          py={"30px"}
          gap="10px"
        >
          {Options.map((option, index) => (
            <Option
              key={index}
              {...option}
              minimizeStatus={{
                base: false,
                md: minimized.md ? true : false,
                lg: minimized.lg ? true : false,
              }}
              active={activeTab === option.value ? true : false}
            />
          ))}
        </Flex>

        <Flex
          direction={"column"}
          w={"max-content"}
          alignItems={"center"}
          px={!minimized ? "30px" : "10px"}
          py={"30px"}
          gap="10px"
          borderTop={"1px"}
          borderTopColor={`gray.100`}
        >
          <Option {...settings} minimizeStatus={minimized} />
          <Option {...logout} minimizeStatus={minimized} />

          <Popover placement="right" onClose={handlePopoverClose}>
            <PopoverTrigger>
              {/* <Button>
                <Flex gap={2} alignItems={"center"}>
                  <BsInfoCircle />
                  <Text>Send Feedback</Text>
                </Flex>
              </Button> */}
              
              <Button>
                <Option {...feedbackOption} minimizeStatus={minimized} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">Send feedback</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <FormControl>
                  <FormLabel mt={4}>Feedback</FormLabel>
                  <Input
                    onChange={(event) => setFeedback(event.target.value)}
                    type="text"
                    placeholder="Enter feedback..."
                    value={feedback}
                  />
                  <FormHelperText>
                    {feedbackError === ""
                      ? "Your feedback is vlauble for us"
                      : feedbackError}
                  </FormHelperText>
                </FormControl>
                <Flex gap={2} mt={4}>
                  <Button
                    bg={"#444"}
                    color={"#fff"}
                    _hover={{ backgroundColor: "#444", color: "fff" }}
                    onClick={handleFeedback}
                  >
                    Send
                  </Button>
                  <Button
                    bg={"#E9E9E9"}
                    color={"#444"}
                    _hover={{ background: "#E9E9E9", color: "#444" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
