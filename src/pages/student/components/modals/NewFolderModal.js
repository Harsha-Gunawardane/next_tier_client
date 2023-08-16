import {
  Flex,
  Text,
  Button,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import ModalLayout from "../../../../components/ModalLayout";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const FOLDER_URL = "/stu/folder";
const NAMING_REGEX = /^[a-zA-Z ]{3,50}$/;

function NewFolderModal({ isOpen, handleCloseModal }) {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const [folderName, setFolderName] = useState("");
  const [validFolderName, setValidFolderName] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    console.log(folderName);
    setValidFolderName(NAMING_REGEX.test(folderName));
  }, [folderName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validFolderName) {
      toast({
        title: "Please enter valid tute name",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    try {
      const response = await axiosPrivate.post(FOLDER_URL, {
        name: folderName,
      });
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Folder name is already in use");
      } else if (err.response?.status === 400) {
        setErrMsg("Folder name is invalid");
      } else {
        setErrMsg("Something went wrong");
      }
    } finally {
      handleCloseModal();
    }
    console.log(folderName);
  };

  const modalheader = "Create new folder";
  const modalbody = (
    <>
      <Text display={errMsg ? "block" : "none"}>{errMsg}</Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel
            fontSize={16}
            color="#555555"
            fontWeight="regular"
            fontStyle="Roboto"
            htmlFor="fName"
          >
            <Flex justifyContent="space-between" w="95%" alignItems="center">
              Folder name
              <CheckIcon
                color="#15BD66"
                fontWeight="bold"
                display={validFolderName ? "flex" : "none"}
              />
              <CloseIcon
                color="#D93400"
                fontWeight="bold"
                display={validFolderName || !folderName ? "none" : "flex"}
              />
            </Flex>
          </FormLabel>
          <Flex justifyContent="center" w="95%">
            <Input
              id="folderName"
              type="text"
              required
              placeholder="Enter folder name"
              onChange={(e) => setFolderName(e.target.value)}
              h={9}
              bg="#e9e9e9"
              border="1px solid #D9D9D9"
              fontSize={14}
              w="95%"
            />
          </Flex>
          <FormHelperText
            display={folderName && !validFolderName ? "block" : "none"}
            fontSize={13}
            ml={5}
            mt={2}
            color="#D57974"
          >
            use atleast 3 characters
          </FormHelperText>
        </FormControl>
      </form>
    </>
  );

  const modalfooter = (
    <Flex pr={9}>
      <Button
        onClick={handleSubmit}
        cursor="pointer"
        pl={5}
        pr={5}
        pt={1.5}
        pb={1.5}
        color="#FFFFFF"
        fontWeight={"normal"}
        bg="#0074D9"
        _hover={{ color: "#FFFFFF", backgroundColor: "#0074D9" }}
      >
        create
      </Button>
    </Flex>
  );

  return (
    <ModalLayout
      title={modalheader}
      body={modalbody}
      footer={modalfooter}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
    />
  );
}

export default NewFolderModal;
