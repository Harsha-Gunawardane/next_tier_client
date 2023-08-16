import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import { useFetchTutes } from "../../../../hooks/reduxReducers/tutesReducer";
import { useEffect } from "react";

import Loading from "../../../../components/skeleton/Loading";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useFoldersInfo } from "../../../../store/student/useFoldersInfo";

const FOLDER_URL = "/stu/folder";

function TuteLayout() {
  const axiosPrivate = useAxiosPrivate();
  const { isLoading } = useFetchTutes();
  if (isLoading) return <Loading />;

  // const { setFolders } = useFoldersInfo();

  // const fetchFolders = async () => {
  //   try {
  //     const response = await axiosPrivate.get(FOLDER_URL);
  //     console.log(response.data);

  //     setFolders(response.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFolders();
  // }, []);

  return (
    <Flex>
      <LeftPanel />
      <Outlet />
    </Flex>
  );
}

export default TuteLayout;
