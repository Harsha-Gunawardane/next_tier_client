import {
  Flex,
  Text,
  Button,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  Divider,
  useToast,
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

const TUTE_URL = "/stu/tute";
// form validations
const NAMING_REGEX = /^[a-zA-Z ]{3,50}$/;

function NewTuteModal({ isOpen, handleCloseModal }) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [tuteName, setTuteName] = useState("");
  const [validTuteName, setValidTuteName] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log(tuteName);
    setValidTuteName(NAMING_REGEX.test(tuteName));
  }, [tuteName]);

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const onChangeFile = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validTuteName) {
      toast({
        title: "Please enter valid tute name",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    const tuteId = `${uuid()}-${tuteName}`;

    dispatch(createTute(tuteId, tuteName, ""));

    // save data on local storage
    localStorage.setItem("tuteName", tuteName);
    localStorage.setItem("tuteId", tuteId);

    const formData = new FormData();

    // if (selectedFile) {
    //   formData.append("file", selectedFile);
    // }

    formData.append("file", selectedFile);
    formData.append("id", tuteId);
    formData.append("name", tuteName);

    console.log(formData);

    try {
      const response = await axiosPrivate.post(TUTE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Request successful:", response.data);
      dispatch(addPage(tuteId, tuteName));

      navigate(`new/${tuteId}`);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Tute name is already in use");
      } else {
        setErrMsg("Something went wrong");
      }
    } finally {
      handleCloseModal();
    }
    console.log(tuteName);
  };

  const modalheader = "Create new tute";
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
            use atleast 3 characters
          </FormHelperText>

          <Divider mt={10} mb={5} />
          <Flex justifyContent={"center"}>
            <Text fontSize={13} color={"#444444"}>
              You can upload your tute as well.
            </Text>
          </Flex>

          <FormLabel mt={3}>
            <Text
              fontSize={16}
              color="#555555"
              fontWeight="regular"
              fontStyle="Roboto"
              htmlFor="file"
            >
              Upload your tute
            </Text>
          </FormLabel>
          <Flex justifyContent="center" w="95%">
            <Input
              type="file"
              accept="application/pdf"
              size="lg"
              // id="file"
              placeholder="Upload your tute"
              h={9}
              bg="#e9e9e9"
              border="1px solid #D9D9D9"
              fontSize={14}
              w="95%"
              onChange={onChangeFile}
            />
          </Flex>

          {/* <Button type="submit">Upload</Button> */}
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
