import React from "react";
import { useToast } from "@chakra-ui/react";

function ToastNotification({ title, description, status}) {
  const toast = useToast();

  return toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  })
}

export default ToastNotification;
