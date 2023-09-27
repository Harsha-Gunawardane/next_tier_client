import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import { useEffect, useState } from "react";

import Loading from "../../../../components/skeleton/Loading";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useFoldersInfo } from "../../../../store/student/useFoldersInfo";

const TUTES_URL = "/stu/tutes";

function TuteLayout() {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const { setFolders, setTutes } = useFoldersInfo();

  const fetchPages = async () => {
    try {
      const response = await axiosPrivate.get(TUTES_URL);
      console.log(response.data?.data);

      setFolders(response.data?.data.folders)
      setTutes(response.data?.data.pages)

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Flex>
      <LeftPanel />
      <Outlet />
    </Flex>
  );
}

export default TuteLayout;
