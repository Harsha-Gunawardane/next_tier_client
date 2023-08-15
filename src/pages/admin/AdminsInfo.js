import { Flex, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import SelectedProfile from "./components/SelectedProfile";
import AdminProfiles from "./components/AdminProfiles";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAdminsInfo } from "../../store/admin/useAdminsInfo";

const ADMINS_URL = "/admin/all";

function AdminsInfo() {
  const axiosPrivate = useAxiosPrivate();
  const {
    adminsInfo,
    selectedAdmin,

    setAdminsInfo,
    setSelectedAdmin
  } = useAdminsInfo();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axiosPrivate.get(ADMINS_URL);
        console.log(response?.data?.data);

        const adminsInfo = response?.data?.data;

        setAdminsInfo(adminsInfo)
        setSelectedAdmin(adminsInfo[0])
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <Flex>
      <SelectedProfile profile={selectedAdmin} />
      <AdminProfiles profiles={adminsInfo} />
    </Flex>
  );
}

export default AdminsInfo;
