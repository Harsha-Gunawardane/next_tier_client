import {
  Flex,
  Text,
  Button,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
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

  const [tuteName, setTuteName] = useState("");
  const [validTuteName, setValidTuteName] = useState(false);
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    console.log(tuteName);
    setValidTuteName(NAMING_REGEX.test(tuteName));
  }, [tuteName]);

  const handleSUbmit = async (e) => {
    e.preventDefault();

    if (validTuteName) {
      const tuteId = `${uuid()}-${tuteName}`;

      dispatch(createTute(tuteId, tuteName, ''));

      // save data on local storage
      localStorage.setItem("tuteName", tuteName);
      localStorage.setItem("tuteId", tuteId);

      try {
        const response = await axiosPrivate.post(TUTE_URL, {
          id: tuteId,
          name: tuteName,
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
      }
      console.log(tuteName);
      handleCloseModal();
    }
  };

  const modalheader = "Create new tute";
  const modalbody = (
    <>
    <Text display={errMsg ? 'block' : 'none'}>{errMsg}</Text>
      <form>
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
        </FormControl>
      </form>
    </>
  );

  const modalfooter = (
    <Flex>
      <Button onClick={handleSUbmit}>create</Button>
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
