import { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

import useStaffStore from "../../zustandStore/staffStore.js";

import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

//Imported Components
import StaffTable from "../../components/TutorStaff/StaffTable.js";
import StaffHeaderBar from "../../components/TutorStaff/StaffHeaderBar.js";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.js";
// import ModalPopup from "../../components/TutorStaff/ModalPopup.js";
// import { Modal } from "@mantine/core";

import NewStaffModalPopup from "../../components/TutorStaff/NewStaffModalPopup.js";
import StaffDeleteAlertDialog from "../../components/TutorStaff/StaffDeleteAlertDialog.js";

const TutorStaffs = () => {
  const [staffIdToDelete, setStaffIdToDelete] = useState();

  const {
    isOpen: isNewStaffPopupOpen,
    onOpen: onNewStaffPopupOpen,
    onClose: onNewStaffPopupClose,
  } = useDisclosure();

  const {
    isOpen: isStaffDeleteAlertDialogOpen,
    onOpen: onStaffDeleteAlertDialogOpen,
    onClose: onStaffDeleteAlertDialogClose,
  } = useDisclosure();

  const [search, setSearch] = useState("");

  //Zustand store
  const staffs = useStaffStore((state) => state.staffs);
  const fetchStaffs = useStaffStore((state) => state.fetchStaffs);
  const deleteStaff = useStaffStore((state) => state.deleteStaff);

  useEffect(() => {
    //Getting data from the db
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      // Open the delete alert dialog before performing the deletion
      onStaffDeleteAlertDialogOpen();
      // Save the staff ID to be deleted in the state
      setStaffIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
    }
  };

  return (
    <Box width="100%">
      <NewStaffModalPopup
        isOpen={isNewStaffPopupOpen}
        onOpen={onNewStaffPopupOpen}
        onClose={onNewStaffPopupClose}
      />
      <StaffDeleteAlertDialog
        isOpen={isStaffDeleteAlertDialogOpen}
        onClose={onStaffDeleteAlertDialogClose}
        handleDelete={handleDelete}
        staffIdToDelete={staffIdToDelete}
        deleteStaff={deleteStaff}
      />
      <StaffHeaderBar
        search={search}
        setSearch={setSearch}
        onOpen={onNewStaffPopupOpen}
      />
      <StaffTable
        staffs={staffs.filter((staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase())
        )}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default TutorStaffs;
