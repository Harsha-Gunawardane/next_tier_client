import React, { useState } from "react";
import { Accordion } from "@mantine/core";
import PageNameCard from "../cards/PageNameCard";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import "../../../../assests/css/accordion.css";
import truncate from "../../../../utils/truncateString";
import NewTuteModal from "../modals/NewTuteModal";

function FolderList({ folders }) {
  const navigate = useNavigate();

  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onClickHandle = async (key) => {
    console.log("Click " + key);
    navigate(`view/${key}`);
  };

  const handlePlusBtn = (folderName) => (event) => {
    event.stopPropagation();

    setFolderName(folderName);
    handleOpenModal();
    console.log("folder -> ", folderName);
  };

  return (
    <>
      <Box w={220} pl={8} h={160} maxH={160} overflowY={"scroll"}>
        <Accordion variant="filled" radius="md" chevronPosition="left">
          {folders.map((folder) => {
            return (
              <Accordion.Item value={folder.name}>
                <Accordion.Control>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    onMouseEnter={() => setHoveredItem(folder.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Text fontSize={14} color="#444444">
                      {folder.name}
                    </Text>
                    {hoveredItem === folder.name && (
                      <AiOutlinePlusCircle
                        color="#454545"
                        onClick={handlePlusBtn(folder.name)}
                      />
                    )}
                  </Flex>
                </Accordion.Control>
                <Accordion.Panel>
                  {folder.pages &&
                    folder.pages.map((page) => {
                      return (
                        <PageNameCard
                          key={page.id}
                          onClickHandle={() => onClickHandle(page.id)}
                          name={truncate(page.name, 8)}
                          ml={8}
                        />
                      );
                    })}
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Box>
      <NewTuteModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        folderName={folderName}
      />
    </>
  );
}

export default FolderList;
