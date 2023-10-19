import {
  Flex,
  Text,
  Button,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ModalLayout from "../../../../components/ModalLayout";
import { createTute } from "../../../../hooks/reduxReducers/tuteReducer";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { addPage } from "../../../../hooks/reduxReducers/tutesReducer";
import { useFoldersInfo } from "../../../../store/student/useFoldersInfo";

const TUTE_URL = "/stu/tute";
// form validations
const NAMING_REGEX = /^[a-zA-Z ]{3,50}$/;
const DESCRIPTION_REGEX = /^[a-zA-Z ]{3,150}$/;

function NewTuteModal({ isOpen, handleCloseModal, folderName = null }) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [tuteName, setTuteName] = useState("");
  const [description, setDescription] = useState("");
  const [validTuteName, setValidTuteName] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { addNewTute } = useFoldersInfo();

  useEffect(() => {
    setValidTuteName(NAMING_REGEX.test(tuteName.trim()));
    setValidDescription(DESCRIPTION_REGEX.test(description.trim()));
  }, [tuteName, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validTuteName || !validDescription) {
      toast({
        title: "Please enter valid data",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    const tuteId = `${uuid()}-${tuteName}`;

    dispatch(createTute(tuteId, tuteName, ""));

    try {
      const response = await axiosPrivate.post(TUTE_URL, {
        id: tuteId,
        name: tuteName,
        description: description,
        folderName,
      });
      console.log("Request successful:", response.data);
      dispatch(addPage(tuteId, tuteName));

      setTuteName("");
      if (!folderName) addNewTute({ id: tuteId, name: tuteName, folderId: "" });

      navigate(`new/${tuteId}`);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Tute name is already in use");
      } else {
        setErrMsg("Something went wrong");
      }

      toast({
        title: "Warning",
        description: errMsg,
        status: "warning",
        isClosable: true,
        position: "top-right",
      });
      setTuteName("");
    } finally {
      handleCloseModal();
      setTuteName("");
      setDescription("");
    }
    console.log(tuteName);
  };

  const modalheader = "Create new tute";
  const modalbody = (
    <>
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
              Tute name
              <CheckIcon
                color="#15BD66"
                fontWeight="bold"
                display={validTuteName ? "flex" : "none"}
              />
              <CloseIcon
                color="#D93400"
                fontWeight="bold"
                display={validTuteName || !tuteName ? "none" : "flex"}
              />
            </Flex>
          </FormLabel>
          <Flex justifyContent="center" w="95%">
            <Input
              id="tuteName"
              type="text"
              required
              placeholder="Enter tute name"
              onChange={(e) => setTuteName(e.target.value)}
              h={9}
              bg="#e9e9e9"
              border="1px solid #D9D9D9"
              fontSize={14}
              w="95%"
            />
          </Flex>
          <FormHelperText
            display={tuteName && !validTuteName ? "block" : "none"}
            fontSize={13}
            ml={5}
            mt={2}
            color="#D57974"
          >
            use atleast 3 characters with no numerical values
          </FormHelperText>

          <FormLabel
            mt={3}
            fontSize={16}
            color="#555555"
            fontWeight="regular"
            fontStyle="Roboto"
            htmlFor="fName"
          >
            <Flex justifyContent="space-between" w="95%" alignItems="center">
              Tute description
              <CheckIcon
                color="#15BD66"
                fontWeight="bold"
                display={validDescription ? "flex" : "none"}
              />
              <CloseIcon
                color="#D93400"
                fontWeight="bold"
                display={validDescription || !description ? "none" : "flex"}
              />
            </Flex>
          </FormLabel>
          <Flex justifyContent="center" w="95%">
            <Textarea
              id="tuteName"
              type="text"
              required
              placeholder="Enter tute name"
              onChange={(e) => setDescription(e.target.value)}
              h={9}
              bg="#e9e9e9"
              border="1px solid #D9D9D9"
              fontSize={14}
              w="95%"
            />
          </Flex>
          <FormHelperText
            display={tuteName && !validTuteName ? "block" : "none"}
            fontSize={13}
            ml={5}
            mt={2}
            color="#D57974"
          >
            use atleast 3 characters with no numerical values
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

export default NewTuteModal;
