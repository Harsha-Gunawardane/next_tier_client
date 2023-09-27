import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import "../../../../assests/css/pdfView.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ModalLayout from "../../../../components/ModalLayout";

const TUTE_URL = "/stu/tute";

const PDFView = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();

  const [tute, setTute] = useState("");
  const [heading, setHeading] = useState("");

  // for delete confirmation
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    alert("Are you sure you want to delete" + id);
  };

  const title = "Are you sure?";
  const body = (
    <>
      <Text>{`Do you want to delete ${heading}?`}</Text>
    </>
  );
  const footer = (
    <>
      <Flex gap={2}>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleDelete} bg={"#fa5252"} color={"#fff"}>
          Delete
        </Button>
      </Flex>
    </>
  );

  const queryString = new URLSearchParams({ id: id }).toString();
  console.log(id);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axiosPrivate.get(`${TUTE_URL}?${queryString}`);
        setTute(response.data?.tute?.content);
        setHeading(response.data?.tute?.name);
        console.log(response.data?.tute);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPdf();
  }, [axiosPrivate, queryString]);

  const renderedContent = (
    <div dangerouslySetInnerHTML={{ __html: tute }}></div>
  );

  return (
    <>
      <Box justifyContent={"center"} w={"100%"}>
        <Flex
          mt={5}
          mb={3}
          w={"100%"}
          fontSize={20}
          fontWeight={"semibold"}
          color={"#333"}
          justifyContent={"center"}
        >
          <Text>{heading}</Text>
        </Flex>

        <Flex w={"100%"} justifyContent={"center"}>
          <Box
            minH={605}
            borderRadius={8}
            border={"1px solid #E9E9E9"}
            p={"1in"}
            w="8.27in"
            // bg={"#EAF8FF"}
          >
            {renderedContent}
          </Box>
        </Flex>
        <Flex justifyContent={"right"} mr={"15%"} mt={5} mb={5}>
          <Flex>
            <Button
              bg={"#868e96"}
              mr={10}
              onClick={() => navigate(`/stu/tutes/new/${id}`)}
            >
              <Flex gap={2} alignItems={"center"} pl={2} pr={2}>
                <AiOutlineEdit fontSize={20} />
                <Text fontWeight={"normal"} fontSize={16}>
                  edit
                </Text>
              </Flex>
            </Button>
            <Button
              bg={"#fa5252"}
              color={"#fff"}
              mr={10}
              onClick={handleOpenModal}
            >
              <Flex gap={2} alignItems={"center"} pl={2} pr={2}>
                <MdDeleteOutline fontSize={20} />
                <Text fontWeight={"normal"} fontSize={16}>
                  delete
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
      <ModalLayout
        title={title}
        body={body}
        footer={footer}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default PDFView;
