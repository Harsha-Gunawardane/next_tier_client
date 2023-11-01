import { useEffect, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Skeleton } from "@mantine/core";

//Imported Components
import StaffTable from "../../components/TutorStaff/StaffTable.js";
import StaffHeaderBar from "../../components/TutorStaff/StaffHeaderBar.js";
import StaffModalPopup from "../../components/TutorStaff/StaffModalPopup.js";
import StaffDeleteAlertDialog from "../../components/TutorStaff/StaffDeleteAlertDialog.js";
import NewStaffStepper from "../../components/TutorStaff/NewStaffStepper.js";
import EditStaffForm from "../../components/TutorStaff/EditStaffForm.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const TutorStaffs = () => {
  const axiosPrivate = useAxiosPrivate();

  const [staffIdToDelete, setStaffIdToDelete] = useState(null);
  const [staffIdToEdit, setStaffIdToEdit] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  const [filteredStaffs, setFilteredStaffs] = useState([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/staffs");
        setStaffs(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getStaffs();
  }, []);

  useEffect(() => {
    if (filter !== null) {
      if (filter === "All Staff") {
        setFilteredStaffs(staffs);
      } else {
        setFilteredStaffs(
          staffs.filter((staff) => staff.staff_title === filter)
        );
      }
    }
  }, [staffs, filter]);

  const {
    isOpen: isNewStaffPopupOpen,
    onOpen: onNewStaffPopupOpen,
    onClose: onNewStaffPopupClose,
  } = useDisclosure();

  const {
    isOpen: isEditStaffPopupOpen,
    onOpen: onEditStaffPopupOpen,
    onClose: onEditStaffPopupClose,
  } = useDisclosure();

  const {
    isOpen: isStaffDeleteAlertDialogOpen,
    onOpen: onStaffDeleteAlertDialogOpen,
    onClose: onStaffDeleteAlertDialogClose,
  } = useDisclosure();

  const handleDelete = (id) => {
    try {
      setStaffIdToDelete(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    try {
      setStaffIdToEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (staffIdToDelete !== null) {
      onStaffDeleteAlertDialogOpen();
    }
  }, [staffIdToDelete]);

  useEffect(() => {
    if (staffIdToEdit !== null) {
      onEditStaffPopupOpen();
      console.log(staffIdToEdit);
    }
  }, [staffIdToEdit]);

  return (
    <Box width="100%">
      <StaffModalPopup
        isOpen={isNewStaffPopupOpen}
        onOpen={onNewStaffPopupOpen}
        onClose={onNewStaffPopupClose}
        modalHeader={"Register a staff"}
        modalBody={
          <NewStaffStepper
            staffs={staffs}
            setStaffs={setStaffs}
            onClose={onNewStaffPopupClose}
          />
        }
        size={"2xl"}
      />

      <StaffModalPopup
        isOpen={isEditStaffPopupOpen}
        onOpen={onEditStaffPopupOpen}
        onClose={onEditStaffPopupClose}
        modalHeader={"Edit a staff"}
        modalBody={
          <EditStaffForm
            staffId={staffIdToEdit}
            onClose={onEditStaffPopupClose}
            staffs={staffs}
            setStaffs={setStaffs}
          />
        }
        size={"2xl"}
      />
      <StaffDeleteAlertDialog
        isOpen={isStaffDeleteAlertDialogOpen}
        onClose={onStaffDeleteAlertDialogClose}
        handleDelete={handleDelete}
        staffIdToDelete={staffIdToDelete}
        staffs={staffs}
        setStaffs={setStaffs}
      />
      <StaffHeaderBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        onOpen={onNewStaffPopupOpen}
      />

      {staffs.length > 0 ? (
        filteredStaffs.length > 0 && filter !== "All Staff" ? (
          <StaffTable
            staffs={filteredStaffs.filter((staff) =>
              staff.first_name.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <StaffTable
            staffs={staffs.filter((staff) =>
              staff.first_name.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default TutorStaffs;
