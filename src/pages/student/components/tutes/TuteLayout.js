import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import LeftPanel from "./LeftPanel";
import { useFetchTutes } from "../../../../hooks/reduxReducers/tutesReducer";

import Loading from '../../../../components/skeleton/Loading'

function TuteLayout() {

  const { isLoading } = useFetchTutes();

  if(isLoading) return (<Loading />)
  
  return (
    <Flex>
      <LeftPanel />
      <Outlet />
    </Flex>
  );
}

export default TuteLayout;
