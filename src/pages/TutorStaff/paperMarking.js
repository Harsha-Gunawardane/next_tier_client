import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

// import api from '../../api/axios';

//Staff Components

import useStaffStore from "../../zustandStore/staffStore.js";
import PaperMarkingTable from "../../components/TutorStaff/PaperMarkingTable.js";
import PaperMarkingHeaderBar from "../../components/TutorStaff/PaperMarkingHeaderBar.js";

const PaperMarking = () => {
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
      <PaperMarkingHeaderBar search={search} setSearch={setSearch} />
      <PaperMarkingTable
        staffs={staffs.filter((staff) =>
          staff.name.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Box>
  );
};

export default PaperMarking;
