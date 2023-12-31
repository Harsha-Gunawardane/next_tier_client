import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import {
  BsFillPlusCircleFill,
  BsArchiveFill,
} from "react-icons/bs";
import { AiFillFolderOpen, AiFillStar, AiFillHome } from "react-icons/ai";
import { useState } from "react";

import LeftPanelTab from "./LeftPanelTab";
import NewTuteModal from "../modals/NewTuteModal";
import TutePageList from "./TutePageList";
import FolderList from "./FolderList";
import { useNavigate } from "react-router-dom";
import NewFolderModal from "../modals/NewFolderModal";
import { useFoldersInfo } from "../../../../store/student/useFoldersInfo";

function LeftPanel() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isFOpen, setIsFOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseFModal = () => {
    setIsFOpen(false);
  };
  const handleOpenFModal = () => {
    setIsFOpen(true);
  };

  const goToStarredTutes = () => {
    navigate("/stu/tutes/starred");
  };

  const goToArchivedTutes = () => {
    navigate("/stu/tutes/archived");
  };

  // const pages = useSelector((state) => state.tutes.pages);
  const { tutes, folders } = useFoldersInfo();

  return (
    <>
      <Box>
        <Flex pl={8} mt={5}>
          <Flex
            cursor={"pointer"}
            alignItems={"center"}
            gap={4}
            bg={"#383838"}
            pl={3.5}
            pr={20}
            pt={2}
            pb={2}
            borderRadius={5}
            onClick={() => navigate("/stu/tutes")}
          >
            <AiFillHome color="#F7F7F7" fontWeight={"bold"} fontSize={18} />
            <Text
              fontSize={16}
              fontWeight={"semibold"}
              textAlign={"center"}
              color={"#F7F7F7"}
            >
              Home
            </Text>
          </Flex>
        </Flex>
        <Box w={250} mt={5}>
          <LeftPanelTab
            title={"New Page"}
            icon={<BsFillPlusCircleFill color="#555555" />}
            onClickHandler={handleOpenModal}
          />
          <LeftPanelTab
            title={"New Folder"}
            icon={<AiFillFolderOpen color="#555555" />}
            onClickHandler={handleOpenFModal}
          />
          <LeftPanelTab
            title={"Starred"}
            icon={<AiFillStar color="#ECC330" />}
            onClickHandler={goToStarredTutes}
          />
          <LeftPanelTab
            title={"Archived"}
            icon={<BsArchiveFill color="#6CB86C" />}
            onClickHandler={goToArchivedTutes}
          />
          {/* <LeftPanelTab
            title={"Trashed"}
            icon={<BsFillTrashFill color="#D57974" />}
          /> */}
          <Flex justifyContent="center">
            <Divider mt={5} mb={6} w="80%" color="#222222" />
          </Flex>
        </Box>

        <Box w={250}>
          <TutePageList pages={tutes} />
          <Flex justifyContent="center">
            <Divider mt={2} mb={2} w="80%" color="#222222" />
          </Flex>

          <FolderList folders={folders} />
        </Box>
      </Box>
      <NewTuteModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
      <NewFolderModal isOpen={isFOpen} handleCloseModal={handleCloseFModal} />
    </>
  );
}

export default LeftPanel;
