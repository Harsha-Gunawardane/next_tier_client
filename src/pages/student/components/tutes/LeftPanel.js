import { Box, Divider, Flex } from "@chakra-ui/react";
import {
  BsFillPlusCircleFill,
  BsArchiveFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { AiFillFolderOpen, AiFillStar } from "react-icons/ai";
import { useState } from "react";

import LeftPanelTab from "./LeftPanelTab";
import NewTuteModal from "../modals/NewTuteModal";
import TutePageList from "./TutePageList";
import truncateString from "../../../../utils/truncateString";
import FolderList from "./FolderList";
import { useSelector } from "react-redux";

function LeftPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const pages = useSelector(state => state.tutes.pages)
  console.log(pages)

  return (
    <>
      <Box>
        <Box w={250} mt={10}>
          <LeftPanelTab
            title={"New Page"}
            icon={<BsFillPlusCircleFill color="#555555" />}
            onClickHandler={handleOpenModal}
          />
          <LeftPanelTab
            title={"New Folder"}
            icon={<AiFillFolderOpen color="#555555" />}
            onClickHandler={handleOpenModal}
          />
          <LeftPanelTab
            title={"Starred"}
            icon={<AiFillStar color="#ECC330" />}
          />
          <LeftPanelTab
            title={"Archived"}
            icon={<BsArchiveFill color="#6CB86C" />}
          />
          <LeftPanelTab
            title={"Trashed"}
            icon={<BsFillTrashFill color="#D57974" />}
          />
          <Flex justifyContent="center">
            <Divider mt={5} mb={6} w="80%" color="#222222" />
          </Flex>
        </Box>

        <Box w={250}>
          <TutePageList
            pages={pages}
          />
          <Flex justifyContent="center">
            <Divider mt={2} mb={2} w="80%" color="#222222" />
          </Flex>

          <FolderList
            folders={[
              { name: "Physics", pages: ["Power", "Energy"] },
              { name: "Chemistry", pages: ["Power", "Energy"] },
            ]}
          />
        </Box>
      </Box>
      <NewTuteModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
    </>
  );
}

export default LeftPanel;
