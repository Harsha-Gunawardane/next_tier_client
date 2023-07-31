import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

// import api from '../../api/axios';

//Staff Components
import StaffTable from "../../components/TutorStaff/StaffTable.js";

import useStaffStore from "../../zustandStore/staffStore.js";
import StaffHeaderBar from "../../components/TutorStaff/StaffHeaderBar.js";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.js";

const StaffList = () => {
  // const [staffs , setStaffs] = useState([]);
  const [search, setSearch] = useState("");

  const staffs = useStaffStore((state) => state.staffs);
  const fetchStaffs = useStaffStore((state) => state.fetchStaffs);
  // const addStaff = useStaffStore((state) => state.addStaff);

  useEffect(() => {
    fetchStaffs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%">
      <BreadCrumbs/>
      <StaffHeaderBar search={search} setSearch={setSearch} />
      <StaffTable
        staffs={staffs.filter((staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Box>
  );
};

export default StaffList;
