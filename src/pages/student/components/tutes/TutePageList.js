import { Box } from "@chakra-ui/react";
import React from "react";

import truncate from "../../../../utils/truncateString";
import PageNameCard from "../cards/PageNameCard";
import { useNavigate } from "react-router-dom";

function TutePageList({ pages }) {
  const navigate = useNavigate();

  const onClickHandle = async (key) => {
    console.log("Click " + key);

    navigate(`view/${key}`);
  };

  return (
    <Box maxH={220} overflowY={"scroll"}>
      {pages.map((page) => {
        return (
          <PageNameCard
            key={page.id}
            onClickHandle={() => onClickHandle(page.id)}
            name={truncate(page.name, 18)}
            ml={12}
          />
        );
      })}
    </Box>
  );
}

export default TutePageList;
